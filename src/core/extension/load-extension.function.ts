import { UmbExtensionManifest, UmbExtensionManifestJSModel } from './extension.registry';

export function loadExtension(manifest: UmbExtensionManifest): Promise<UmbExtensionManifestJSModel> | Promise<null> | null {


    if (typeof manifest.js === 'function') {
        return manifest.js() as Promise<UmbExtensionManifestJSModel>;
    }

    // TODO: verify if this is acceptable solution.
    if (typeof manifest.js === 'string') {
        return new Promise((resolve, reject) => {
            const script  = document.createElement('script');
            script .type = 'text/javascript';
            //script.charset = 'utf-8';
            script.async = true;
            script.src = manifest.js as string;
            script.onload = function () {
              resolve(null);
            };
            script.onerror = function () {
              reject(new Error(`Script load error for ${manifest.js}`))
            };
            document.body.appendChild(script);
        }) as Promise<null>;
    }

    console.log('-- Extension does not have any referenced JS')
    return Promise.resolve(null);
}