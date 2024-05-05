export function getStreams(response: string): string {
    const lines = response.split('\n');

    const streams = [];

    // Iterar pelas linhas para encontrar a resolução e a URL associada
    let currentResolution: null | string = null
    let currentUrl = null;

    lines.forEach((line) => {
        if (line.startsWith('#EXT-X-STREAM-INF')) {
            // Encontrar a resolução nesta linha
            const match = line.match(/RESOLUTION=(\d+x\d+)/);
            if (match) {
                currentResolution = match[1];
            }
        } else if (line.startsWith('http')) {
            // Se houver uma resolução atual e uma URL, armazene-as
            if (currentResolution) {
                streams.push({ resolution: currentResolution, url: line });
                currentResolution = null; // Redefinir para a próxima iteração
            }
        }
    });

    // Encontrar a URL com a maior resolução
    let highestResolution: null | string = null
    let highestResolutionUrl = '';

    streams.forEach((stream) => {
        if (!highestResolution || parseInt(stream.resolution.split('x')[0]) > parseInt(highestResolution.split('x')[0])) {
            highestResolution = stream.resolution;
            highestResolutionUrl = stream.url;
        }
    });

    return highestResolutionUrl
}