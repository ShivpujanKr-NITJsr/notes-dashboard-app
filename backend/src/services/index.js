import {  default as authService } from "./auth/auth.service.js";

import { generateSummaryV2, suggestTagsV2 } from "./openAi/generateSummaryAndSuggestedTags.js";
import { generateSummary } from "./openAi/getAIResponse.js";


const service ={
    auth: {
        isRegisteredEmail: authService.isRegisteredEmail,
        comparePassword: authService.comparePassword,
        generateJWT: authService.generateJWT,
    },
    openAi:{
        // generateSummary: generateSummary,
        // suggestTags: suggestTags,
        generateSummaryV1: generateSummary,
        // suggestTagsV1: suggestTagsV1,
        generateSummary: generateSummaryV2,
        suggestTags: suggestTagsV2,
    }
    
}

export default service;