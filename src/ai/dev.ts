import { config } from 'dotenv';
config();

import '@/ai/flows/predictive-blood-stock-alerts.ts';
import '@/ai/flows/smart-match-emergency-blood.ts';
import '@/ai/flows/generate-predictive-stock-alerts.ts';
import '@/ai/flows/generate-emergency-dispatch-plan.ts';