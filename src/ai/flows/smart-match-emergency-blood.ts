'use server';
/**
 * @fileOverview This file implements the AI-Powered Smart Matching & Dispatch Tool.
 *
 * - smartMatchEmergencyBlood - A function that handles the smart matching and dispatch process for emergency blood requests.
 * - SmartMatchEmergencyBloodInput - The input type for the smartMatchEmergencyBlood function.
 * - SmartMatchEmergencyBloodOutput - The return type for the smartMatchEmergencyBlood function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Helper function to calculate approximate distance between two lat/lon points using Haversine formula
function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

const LocationSchema = z.object({
  latitude: z.number().describe('The latitude coordinate.'),
  longitude: z.number().describe('The longitude coordinate.'),
});

const BloodUnitSchema = z.object({
  bloodGroup: z.string().describe('The blood group (e.g., A+, O-, AB-).'),
  quantity: z.number().int().positive().describe('The number of units available for this blood group.'),
});

const SmartMatchEmergencyBloodInputSchema = z.object({
  bloodGroup: z.string().describe('The required blood group for the emergency request (e.g., A+, O-, AB-).'),
  unitsRequired: z.number().int().positive().describe('The number of blood units required.'),
  hospitalLocation: LocationSchema.describe('The geographic location of the hospital requesting blood.'),
  availableBloodBanks: z.array(z.object({
    id: z.string().describe('Unique identifier for the blood bank.'),
    name: z.string().describe('Name of the blood bank.'),
    location: LocationSchema.describe('The geographic location of the blood bank.'),
    availableUnits: z.array(BloodUnitSchema).describe('List of blood units available at this bank.'),
  })).describe('A list of nearby blood banks and their current inventory.'),
  availableDonors: z.array(z.object({
    id: z.string().describe('Unique identifier for the donor.'),
    name: z.string().describe('Name of the donor.'),
    location: LocationSchema.describe('The geographic location of the donor.'),
    bloodGroup: z.string().describe('The blood group of the donor.'),
    isActivated: z.boolean().describe('Whether the donor is currently active and willing to donate.'),
  })).describe('A list of registered, active donors and their blood groups and locations.'),
});
export type SmartMatchEmergencyBloodInput = z.infer<typeof SmartMatchEmergencyBloodInputSchema>;

const SmartMatchEmergencyBloodOutputSchema = z.object({
  bestMatch: z.object({
    sourceId: z.string().describe('ID of the best matching blood source (blood bank or donor).'),
    sourceName: z.string().describe('Name of the best matching blood source.'),
    sourceType: z.enum(['bloodBank', 'donor']).describe('Type of the best matching blood source.'),
    bloodGroup: z.string().describe('The blood group provided by the best matching source.'),
    unitsAvailable: z.number().int().describe('Number of units available from this source for the requested blood group. For a donor, this is typically 1 unit.').optional(),
    distanceKm: z.number().describe('Distance from the hospital to the best matching source in kilometers.'),
    etaMinutes: z.number().int().describe('Estimated time of arrival from the best matching source to the hospital in minutes.'),
    routeDescription: z.string().describe('A brief description of the fastest route from the source to the hospital.'),
  }).describe('Details of the single best matched blood source to fulfill the immediate need.'),
  dispatchPlan: z.string().describe('A detailed plan for dispatching the blood unit from the chosen source to the hospital, including instructions and expected actions.'),
  donorActivationNeeded: z.boolean().describe('True if donor activation is recommended either because the best match cannot fully meet the units required, or if a donor is the best/fastest option and requires activation; otherwise, false.'),
  suggestedDonorActivationDetails: z.array(z.object({
    donorId: z.string().describe('ID of a suggested donor to activate.'),
    donorName: z.string().describe('Name of the suggested donor.'),
    bloodGroup: z.string().describe('Blood group of the suggested donor.'),
    reason: z.string().describe('Reason for suggesting this donor activation (e.g., "closest O- donor", "to meet remaining units").'),
  })).describe('Details about specific donors to activate if donorActivationNeeded is true. This field is optional and only present if donor activation is needed.').optional(),
});
export type SmartMatchEmergencyBloodOutput = z.infer<typeof SmartMatchEmergencyBloodOutputSchema>;

// Define the tool to calculate route and ETA
const calculateRouteAndEta = ai.defineTool(
  {
    name: 'calculateRouteAndEta',
    description: 'Calculates the approximate distance and estimated time of arrival (ETA) between two geographic locations, returning a simple route description.',
    inputSchema: z.object({
      originLatitude: z.number().describe('The latitude of the origin location.'),
      originLongitude: z.number().describe('The longitude of the origin location.'),
      destinationLatitude: z.number().describe('The latitude of the destination location.'),
      destinationLongitude: z.number().describe('The longitude of the destination location.'),
    }),
    outputSchema: z.object({
      distanceKm: z.number().describe('The distance between the origin and destination in kilometers.'),
      etaMinutes: z.number().int().describe('The estimated time of arrival in minutes.'),
      routeDescription: z.string().describe('A brief description of the route.'),
    }),
  },
  async (input) => {
    const distance = haversineDistance(
      input.originLatitude,
      input.originLongitude,
      input.destinationLatitude,
      input.destinationLongitude
    );
    // Simulate ETA: 1 minute per km for urban areas, plus a base time and some randomness
    const etaMinutes = Math.max(5, Math.round(distance * 1.5 + (Math.random() * 5))); // Min 5 minutes
    const routeDescription = `Drive ${distance.toFixed(1)} km from origin to destination. Expect moderate traffic conditions.`;

    return {
      distanceKm: parseFloat(distance.toFixed(2)),
      etaMinutes,
      routeDescription,
    };
  }
);

const smartMatchEmergencyBloodPrompt = ai.definePrompt({
  name: 'smartMatchEmergencyBloodPrompt',
  input: { schema: SmartMatchEmergencyBloodInputSchema },
  output: { schema: SmartMatchEmergencyBloodOutputSchema },
  tools: [calculateRouteAndEta],
  prompt: `You are an AI-powered emergency blood coordination system. Your goal is to find the single best and fastest source of blood (either a blood bank or an activated donor) for an emergency request, and to recommend additional donor activation if needed.

Input Details:
- Required Blood Group: {{{bloodGroup}}}
- Units Required: {{{unitsRequired}}}
- Hospital Location: Latitude {{{hospitalLocation.latitude}}}, Longitude {{{hospitalLocation.longitude}}}

Available Blood Banks:
{{#if availableBloodBanks}}
  {{#each availableBloodBanks}}
  - ID: {{{id}}}, Name: {{{name}}}, Location: Lat {{{location.latitude}}}, Lon {{{location.longitude}}}
    Available Blood Units:
    {{#each availableUnits}}
      -- Blood Group: {{{bloodGroup}}}, Quantity: {{{quantity}}} units
    {{/each}}
  {{/each}}
{{else}}
  No blood banks available.
{{/if}}

Available Donors:
{{#if availableDonors}}
  {{#each availableDonors}}
  - ID: {{{id}}}, Name: {{{name}}}, Location: Lat {{{location.latitude}}}, Lon {{{location.longitude}}}, Blood Group: {{{bloodGroup}}}, Is Activated: {{{isActivated}}}
  {{/each}}
{{else}}
  No active donors available.
{{/if}}

Your task is to:
1.  **Identify the single optimal blood source (blood bank or activated donor)** based on:
    *   **Compatibility**: Must match the 'requiredBloodGroup'.
    *   **Availability**: The source must have enough compatible units, or be the fastest option for a partial fulfillment.
    *   **Speed/ETA**: Use the 'calculateRouteAndEta' tool to determine the fastest route to the hospital. Prioritize the source with the lowest ETA.
    *   **Priority**: First, consider blood banks that can fully meet 'unitsRequired'. If not available, or if a donor is significantly faster, then consider active donors.
2.  **Populate the 'bestMatch' object** with the details of the chosen optimal source. For donors, assume 1 unit available.
3.  **Formulate a clear and actionable 'dispatchPlan'** for getting the blood from the 'bestMatch' source to the hospital. Detail the source, route, and expected actions.
4.  **Determine if 'donorActivationNeeded' is true or false.** This should be true if:
    *   The 'bestMatch' source cannot fully meet the 'unitsRequired'.
    *   No suitable blood bank was found, and active donors are insufficient or no active donors were found at all.
    *   A faster compatible donor exists but is not yet activated.
5.  If 'donorActivationNeeded' is true, **suggest specific compatible donors for activation** in 'suggestedDonorActivationDetails'. Prioritize nearby compatible donors who are not yet active or additional donors if more units are needed, specifying why each donor is suggested.

When using the 'calculateRouteAndEta' tool, ensure you pass the correct latitude and longitude values from the blood bank/donor location as the 'origin' and the hospital location as the 'destination'.

Strictly adhere to the output schema. Ensure all fields are populated correctly. If no match can be found at all, return an empty `bestMatch` object and set `donorActivationNeeded` to true with suggestions if any, or a plan indicating no immediate source found.
`,
});

export async function smartMatchEmergencyBlood(input: SmartMatchEmergencyBloodInput): Promise<SmartMatchEmergencyBloodOutput> {
  return smartMatchEmergencyBloodFlow(input);
}

const smartMatchEmergencyBloodFlow = ai.defineFlow(
  {
    name: 'smartMatchEmergencyBloodFlow',
    inputSchema: SmartMatchEmergencyBloodInputSchema,
    outputSchema: SmartMatchEmergencyBloodOutputSchema,
  },
  async (input) => {
    // The prompt is designed to use the tool internally for route calculation and decision-making.
    const { output } = await smartMatchEmergencyBloodPrompt(input);
    return output!;
  }
);
