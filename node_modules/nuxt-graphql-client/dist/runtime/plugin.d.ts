import type { Ref } from 'vue';
import type { GqlState } from '../types.js';
import type { GqlClients } from '#gql';
declare const _default: import("#app").Plugin<Record<string, unknown>> & import("#app").ObjectPlugin<Record<string, unknown>>;
export default _default;
declare module '#app' {
    interface NuxtApp {
        _gqlState: Ref<GqlState>;
    }
    interface RuntimeNuxtHooks {
        /**
         * `gql:auth:init` hook specifies how the authentication token is retrieved.
         */
        'gql:auth:init': (params: {
            client: GqlClients;
            token: Ref<string | undefined>;
        }) => void;
    }
}
