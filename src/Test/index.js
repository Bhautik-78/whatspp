import React from 'react';

class ScrollingList extends React.Component {
    constructor(props) {
        super(props);
        this.listRef = React.createRef();
        this.staticSlot = null;
    }

    componentDidMount() {
        window.googletag = window.googletag || {cmd: []};
        const googletag = window.googletag

        // GPT ad slots
        var interstitialSlot, staticSlot;

        googletag.cmd.push(function() {
            // Define a web interstitial ad slot.
            interstitialSlot = googletag.defineOutOfPageSlot(
                '/6355419/Travel/Europe/France/Paris',
                googletag.enums.OutOfPageFormat.INTERSTITIAL);

            // Slot returns null if the page or device does not support interstitials.
            debugger;
            if (interstitialSlot) {
                interstitialSlot.addService(googletag.pubads());

                document.getElementById('status').innerText = 'Interstitial is loading...';

                // Add event listener to enable navigation once the interstitial loads.
                // If this event doesn't fire, try clearing local storage and refreshing
                // the page.
                googletag.pubads().addEventListener('slotOnload', function(event) {
                    if (interstitialSlot === event.slot) {
                        document.getElementById('link').style.display = 'block';
                        document.getElementById('status').innerText = 'Interstitial is loaded.';
                    }
                });
            }

            // Define static ad slots.
            staticSlot = googletag.defineSlot(
                '/6355419/Travel/Europe', [100, 100], 'static-ad-1')
                .addService(googletag.pubads());
            this.staticSlot= staticSlot;

            // Enable SRA and services.
            googletag.pubads().enableSingleRequest();
            googletag.enableServices();
        });

    }

    render() {
        return (
            <div ref={this.listRef}>
                <div id="static-ad-1" style={{width: "100px", height: "100px"}}></div>
                <div className="content">
                    <span id="status">Web interstitial is not supported on this page.</span>
                    <p>
                        <a id="link" href="https://www.google.com/">TRIGGER INTERSTITIAL</a>
                    </p>
                    <p>

                        <a data-google-interstitial="false" href="https://www.google.com/">
                            This link will never trigger an interstitial
                        </a>
                    </p>
                </div>
                <script>
                    window.googletag.cmd.push(function() {
                    // Ensure the first call to display comes after static ad slot
                    // divs are defined.
                    window.googletag &&  window.googletag.display && window.googletag.display(this.staticSlot)
                });
                </script>
            </div>
        );
    }
}

export default ScrollingList;