import { AnyInteractionGateway } from "oceanic.js";
import { AkitaClient } from "../classes/client";
export interface interactionEventOptios {
    before?: string;
}
export declare function interaction_create_event(int: AnyInteractionGateway, client: AkitaClient, options?: interactionEventOptios): Promise<void>;
//# sourceMappingURL=interaction.d.ts.map