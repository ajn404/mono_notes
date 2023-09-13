import { useEffect } from 'react';

export default () => {
    useEffect(() => {
        import('peaks.js').then(modele => {
            const Peaks = modele.default;
            const options = {
                zoomview: {
                    container: document.getElementById('zoomview-container') as HTMLElement
                },
                overview: {
                    container: document.getElementById('overview-container') as HTMLElement,
                    segmentOptions: {
                        overlayLabelColor: '#993300'
                    }
                },
                mediaElement: document.getElementById('audio') as HTMLElement,
                webAudio: {
                    audioContext: new AudioContext()
                }
            };
            Peaks.init(options, function (err, peaks) {
                if (err) {
                    console.error('Failed to initialize Peaks instance: ' + err.message);
                    return;
                }
            });
        })

    })

    return <div className='peaks w-full'>
        <div id="zoomview-container" className=' h-[200px]'></div>
        <div id="overview-container" className=' h-[200px]'></div>
        <audio id="audio" controls>
            <source src="/mono_notes/assets/sorry.mp3" type="audio/mpeg" />
        </audio>
    </div>
}

