const GITHUB_REPO_BASE_URL = "https://github.com/bitrix-tools/b24-rest-docs/";
var dynamicObserver = null;

// functions to add buttons to the right panel
function createSeparator () {
    var divider = document.createElement('div');
    divider.className = 'dc-divider-control dc-divider-control_vertical dc-controls__divider';
    return divider;
}

function createLink( url, buttonCaption, svgPath, additionalClass) {

    if (url != '') {
        var link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.className = 'dc-controls__control b24-toolbar-btn';
    }

    // Create the button element
    var button = document.createElement('button');
    button.setAttribute('aria-label', buttonCaption);
    button.setAttribute('title', buttonCaption);
    button.className = 'g-button g-button_view_flat-secondary g-button_size_m g-button_pin_round-round dc-control dc-controls__control b24-toolbar-btn ' + additionalClass;
    button.type = 'button';

    // Create the span for the button icon
    var spanIcon = document.createElement('span');
    spanIcon.className = 'g-button__icon';

    // Create the inner span for the button icon
    var spanIconInner = document.createElement('span');
    spanIconInner.className = 'g-button__icon-inner';

    // Create the SVG for the button icon
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '16');
    svg.setAttribute('height', '16');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('viewBox', '0 0 16 16');
    svg.innerHTML = svgPath;

    // Append the elements together
    spanIconInner.appendChild(svg);
    spanIcon.appendChild(spanIconInner);
    button.appendChild(spanIcon);

    if (url != '') {
        link.appendChild(button);
        return link;
    }
    else return button;
}

function convertToGitHubProjectLink() {
    const currentUrl = window.location.href;

    const origin = window.location.origin;
    let path = currentUrl.replace(origin, "");

    const githubBaseUrl = `${GITHUB_REPO_BASE_URL}blob/main/`;

    if (path.endsWith(".html")) {
        path = path.replace(/\.html$/, ".md");
    } else if (path.endsWith("/")) {
        path += "index.md";
    } else if (!path.endsWith(".md")) {
        path += "/index.md";
    }

    return githubBaseUrl + path + '?plain=1';
}

function addB24Buttons () {
    // Find the div with the class 'dc-controls'
    var dcControlsDiv = document.querySelector('.dc-doc-page__controls .dc-controls');

    if (dcControlsDiv) {

        var b24Button = document.querySelector('.b24-toolbar-btn');

        if (b24Button === null) {
            // Append the new elements to the 'dc-controls' div
            dcControlsDiv.appendChild(createSeparator());
            dcControlsDiv.appendChild(createLink(
                convertToGitHubProjectLink(),
                'Edit in GitHub',
                '<path fill="currentColor" fill-rule="evenodd" d="M11.423 1A3.577 3.577 0 0 1 15 4.577c0 .27-.108.53-.3.722l-.528.529-1.971 1.971-5.059 5.059a3 3 0 0 1-1.533.82l-2.638.528a1 1 0 0 1-1.177-1.177l.528-2.638a3 3 0 0 1 .82-1.533l5.059-5.059 2.5-2.5c.191-.191.451-.299.722-.299Zm-2.31 4.009-4.91 4.91a1.5 1.5 0 0 0-.41.766l-.38 1.903 1.902-.38a1.5 1.5 0 0 0 .767-.41l4.91-4.91a2.077 2.077 0 0 0-1.88-1.88Zm3.098.658a3.59 3.59 0 0 0-1.878-1.879l1.28-1.28c.995.09 1.788.884 1.878 1.88l-1.28 1.28Z" clip-rule="evenodd"></path>',
                ''
            ));

            const TITLE = document.title;
            const currentUrl = window.location.href;

            const issue_url = `${GITHUB_REPO_BASE_URL}issues/new` +
                `?title=${encodeURIComponent(`Page ${TITLE}`)}` +
                `&body=${encodeURIComponent(`Page link: ${currentUrl}`)}`;

            dcControlsDiv.appendChild(createSeparator());
            dcControlsDiv.appendChild(createLink(
                issue_url,
                'Report an issue or ask a question',
                '<path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>',
                ''
            ));


            /* to-do
            dcControlsDiv.appendChild(createSeparator());
            dcControlsDiv.appendChild(createLink(
                '',
                'Article is helpful', 
                '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="m4 7 2.94-5.041a1.932 1.932 0 0 1 3.56 1.378L10.25 4.5 9.93 6h2.94a2 2 0 0 1 1.927 2.535l-.879 3.162A4 4 0 0 1 9.596 14.6L4.5 14 4 7Zm5.771 6.11-3.863-.455-.379-5.3 2.708-4.64a.432.432 0 0 1 .796.308l-.571 2.663L8.073 7.5h4.796a.5.5 0 0 1 .482.634l-.879 3.162a2.5 2.5 0 0 1-2.7 1.814ZM2.748 7.447a.75.75 0 1 0-1.496.106l.5 7a.75.75 0 0 0 1.496-.106l-.5-7Z" clip-rule="evenodd"></path>',
                'dc-feedback__control dc-feedback__control_view_regular'
            ));
            dcControlsDiv.appendChild(createLink(
                '',
                'Article isn't helpful', 
                '<path fill="currentColor" fill-rule="evenodd" d="m12 9-2.94 5.041a1.932 1.932 0 0 1-3.56-1.378l.25-1.163.321-1.5h-2.94a2 2 0 0 1-1.927-2.535l.879-3.162A4 4 0 0 1 6.404 1.4L11.5 2l.5 7ZM6.229 2.89l3.863.455.379 5.3-2.708 4.64a.432.432 0 0 1-.796-.308l.571-2.663.389-1.814H3.13a.5.5 0 0 1-.482-.634l.879-3.162a2.5 2.5 0 0 1 2.7-1.814Zm7.023 5.663a.75.75 0 1 0 1.496-.106l-.5-7a.75.75 0 0 0-1.496.106l.5 7Z" clip-rule="evenodd"></path>',
                'dc-feedback__control dc-feedback__control_view_regular'
            ));
            */
        }
    }
}

// Fix for position in the left menu
function setMenuPosition () {
    const activeItem = document.querySelector('.dc-toc__list-item_active');
    if (activeItem)
    {
        const parentContent = activeItem.closest('.dc-toc__content');
        if (parentContent)
        {
            parentContent.scrollTop = activeItem.offsetTop - parentContent.offsetTop;
        }
    }
}

// Methods for adding copy icons to code blocks
function getActualBackgroundColor(element)
{
    // Create a temporary canvas element
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    // Set the canvas dimensions
    const rect = element.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
    // Draw the element onto the canvas with all styles applied
    const computedStyle = window.getComputedStyle(element);
    // Set the canvas background to the element's background color
    context.fillStyle = computedStyle.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    // Get the pixel color data
    const pixelData = context.getImageData(0, 0, 1, 1).data;
    // Form the color in rgba format
    const rgbaColor = `rgba(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]}, ${pixelData[3] / 255})`;

    return rgbaColor;
}

function blendColors(elementRgbaStr, backgroundRgbStr)
{
    // Regular expressions to extract values from strings
    const rgbaRegex = /rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*(?:\.\d+)?)\)/;
    const rgbRegex = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/;
    // Extract values from strings
    const elementMatch = elementRgbaStr.match(rgbaRegex);
    const backgroundMatch = backgroundRgbStr.match(rgbRegex);
    if (!elementMatch || !backgroundMatch)
    {
        throw new Error('Invalid input format.');
    }
    // Convert extracted strings to numbers
    const element = {
        r: parseInt(elementMatch[1], 10),
        g: parseInt(elementMatch[2], 10),
        b: parseInt(elementMatch[3], 10),
        a: parseFloat(elementMatch[4]),
    };
    const background = {
        r: parseInt(backgroundMatch[1], 10),
        g: parseInt(backgroundMatch[2], 10),
        b: parseInt(backgroundMatch[3], 10),
    };
    // Calculate the resulting color for each channel
    const resultColor = {
        r: Math.round(element.r * element.a + background.r * (1 - element.a)),
        g: Math.round(element.g * element.a + background.g * (1 - element.a)),
        b: Math.round(element.b * element.a + background.b * (1 - element.a)),
    };

    return `rgb(${resultColor.r}, ${resultColor.g}, ${resultColor.b})`;
}

function findParentTableRow(element)
{
    // Traverse up the DOM until we encounter a <table> or reach the top
    while (element.parentElement)
    {
        if (element.tagName.toLowerCase() === 'tr')
        {
            return element; // Return the parent <tr> element
        }
        if (element.tagName.toLowerCase() === 'table')
        {
            return null; // Element is inside a <table> but has no parent <tr>
        }
        element = element.parentElement;
    }
    return null; // Element is not inside a <table>
}

function addCopyIconsToCodeElements() {
    const codeElements = document.querySelectorAll('code');

    codeElements.forEach(codeElement => {

        if (codeElement.closest('pre')) {
            return;
        }

        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.display = 'inline-block';

        const copyIconWrapper = document.createElement('div');
        const bodyBackgroundColor = window.getComputedStyle(document.body).backgroundColor;
        copyIconWrapper.style.backgroundColor = bodyBackgroundColor;

        copyIconWrapper.style.position = 'absolute';
        copyIconWrapper.style.right = '0';
        copyIconWrapper.style.top = '50%';
        copyIconWrapper.style.transform = 'translateY(-50%)';
        copyIconWrapper.style.cursor = 'pointer';
        copyIconWrapper.style.display = 'none';

        const copyIcon = document.createElement('span');
        copyIcon.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" class="yfm-clipboard-icon" data-animation="121">
                <path fill="currentColor" d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z"></path>
                <path stroke="currentColor" fill="transparent" stroke-width="1.5" d="M9.5 13l3 3l5 -5" visibility="hidden">
                    <animate id="visibileAnimation-121" attributeName="visibility" from="hidden" to="visible" dur="0.2s" fill="freeze" begin=""></animate>
                    <animate id="hideAnimation-121" attributeName="visibility" from="visible" to="hidden" dur="1s" begin="visibileAnimation-121.end+1" fill="freeze"></animate>
                </path>
            </svg>
        `;
        copyIcon.style.border = 'none';
        copyIcon.style.background = 'none';

        copyIconWrapper.appendChild(copyIcon);

        const tooltip = document.createElement('div');
        tooltip.innerHTML = 'Copied!';
        tooltip.style.position = 'absolute';
        tooltip.style.bottom = '100%';
        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.backgroundColor = '#333';
        tooltip.style.color = '#fff';
        tooltip.style.padding = '5px';
        tooltip.style.borderRadius = '3px';
        tooltip.style.fontSize = '12px';
        tooltip.style.display = 'none';
        tooltip.style.zIndex = '10';

        wrapper.appendChild(codeElement.cloneNode(true));
        wrapper.appendChild(copyIconWrapper);
        wrapper.appendChild(tooltip);
        codeElement.replaceWith(wrapper);

        wrapper.addEventListener('mouseenter', () => {
            copyIconWrapper.style.display = 'inline';
        });

        wrapper.addEventListener('mouseleave', () => {
            copyIconWrapper.style.display = 'none';
        });

        copyIconWrapper.addEventListener('click', () => {
            const textToCopy = wrapper.querySelector('code').textContent;
            navigator.clipboard.writeText(textToCopy).then(() => {
                tooltip.style.display = 'block';
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 2000);
            }).catch(err => {
                console.error('Copying text error: ', err);
            });
        });
    });

    const backgroundRgbStr = window.getComputedStyle(document.body).backgroundColor;

    const codeTags = document.querySelectorAll('code');
    codeTags.forEach((codeTag, index) => {
        let rgb = backgroundRgbStr;
        let parentTr = findParentTableRow(codeTag);
        if (parentTr)
        {
            rgb = blendColors(getActualBackgroundColor(parentTr), rgb);
        }

        const elementRgbaStr = getActualBackgroundColor(codeTag);
        const blendColor = blendColors(elementRgbaStr, rgb);

        const nextElement = codeTag.nextElementSibling;
        if (nextElement)
        {
            nextElement.style.backgroundColor = blendColor;
        }
    });
}

// Methods for working with Bitrix24 REST API from the application
function isInsideIframe() {
    return window.self !== window.top;
}

function processCodeBlocks() {
    var container = document.querySelector('.dc-doc-page__main');

    if (container) {

        if (container.querySelector('.debug-button-container')) {
            return;
        }

        const codeBlocks = container.querySelectorAll('code.hljs.js, code.hljs.javascript');

        codeBlocks.forEach(codeBlock => {

            const code = codeBlock.textContent;

            // Create button container
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('debug-button-container');

            // Create "Execute" button
            const executeButton = document.createElement('button');
            executeButton.textContent = 'Execute';
            executeButton.className += ' g-button g-button_view_outlined g-button_size_l g-button_pin_round-round pc-button-block pc-button-block_size_m pc-button-block_theme_outlined pc-buttons__button';
            executeButton.addEventListener('click', () => {
                executeButton.disabled = true;
                executeButton.innerHTML = 'Executing...'; // Clear button content

                setTimeout(() => {
                    try {
                        eval(code);
                    } catch (error) {
                        console.error('Executing code error:', error);
                    } finally {
                        executeButton.disabled = false;
                        executeButton.textContent = 'Execute'; // Reset button text
                    }
                }, 0);
            });

            buttonContainer.appendChild(executeButton);
            codeBlock.parentElement.parentElement.insertAdjacentElement('afterend', buttonContainer);
        });
    }
}

function addAPILibraries() {
    if (isInsideIframe()) {

        const script = document.createElement('script');

        script.src = '//api.bitrix24.com/api/v1/';
        script.onload = function() {
            try {

                BX24.ready(() => {

                    if (!document.querySelector('script[src="https://cdn.jsdelivr.net/npm/eruda"]')) {

                        const erudaScript = document.createElement('script');
                        erudaScript.src = 'https://cdn.jsdelivr.net/npm/eruda';
                        erudaScript.onload = function() {

                            const erudaContainer = document.createElement('div');
                            erudaContainer.className = 'eruda-container';
                            document.body.appendChild(erudaContainer);

                            eruda.init({
                                container: erudaContainer,
                                tool: ['console', 'network'],
                                autoScale: true,
                                defaults: {
                                    displaySize: 30,
                                    transparency: 0.9,
                                    theme: 'Monokai Pro'
                                }
                            });

                            const erudaElement = document.querySelector('#eruda');
                            if (erudaElement) {
                                const shadowRoot = erudaElement.shadowRoot;

                                if (shadowRoot) {
                                    const devToolsElement = shadowRoot.querySelector('.eruda-dev-tools');
                                    if (devToolsElement) {
                                        devToolsElement.style.height = '40%';
                                    } else {
                                        console.error('eruda-dev-tools element not found.');
                                    }

                                    const erudaContainer = shadowRoot.querySelector('.eruda-container');

                                    if (erudaContainer) {

                                        const entryButton = erudaContainer.querySelector('.eruda-entry-btn');

                                        if (entryButton) {

                                            entryButton.style.position = 'absolute';
                                            entryButton.style.bottom = '10px';
                                            entryButton.style.right = '10px';
                                            entryButton.style.top = '';
                                            entryButton.style.left = '';
                                        } else {
                                            console.error('Element with class eruda-entry-btn not found.');
                                        }
                                    } else {
                                        console.error('Element with class eruda-container not found.');
                                    }

                                } else {
                                    console.error('Shadow root not found.');
                                }

                            } else {
                                console.error('Eruda element not found.');
                            }
                            eruda.show();
                        };

                        erudaScript.onerror = function() {
                            console.error('Failed to load Eruda script.');
                        };

                        document.head.appendChild(erudaScript);

                        processCodeBlocks();
                    }

                });
            } catch (error) {
                console.error('Error initializing BX24:', error);
            }
        };
        script.onerror = function() {
            console.error('Failed to load Bitrix24 API script.');
        };

        document.head.appendChild(script);

    }
}

function initB24items() {
    if (dynamicObserver) {
        dynamicObserver.disconnect();
    }

    addB24Buttons();
    addCopyIconsToCodeElements();

    addAPILibraries();
    createDynamicObserver();
}

// Methods for adding additional elements after page load and state changes

function createDynamicObserver() {

    const targetElement = document.querySelector('.pc-layout__navigation');
    const parentElement = targetElement ? targetElement.parentElement : document.body;

    if (!dynamicObserver) dynamicObserver = new MutationObserver(handleMutations);

    dynamicObserver.observe(parentElement, { childList: true, subtree: true });
}

const mainObserver = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && document.readyState === 'complete') {
            mainObserver.disconnect();

            initB24items();

            break;
        }
    }
});

function checkVisibility(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
}

function handleMutations(mutationsList, observer) {
    mutationsList.forEach(mutation => {
        if (mutation.type === 'childList') {
            const targetElement = document.querySelector('.pc-layout__navigation');
            if (targetElement && checkVisibility(targetElement)) {
                initB24items();
            }
        }
    });
}

function showPollBanner()
{
    let inIframe = false;
    try {
        inIframe = window.self !== window.top;
    } catch (e) {
        inIframe = true;
    }
    if (inIframe) {
        return;
    }

    if (window.location.pathname === '/poll-bar.html') {
        return;
    }

    const STORAGE_KEY_TIME = 'hideB24BannerUntil';
    const STORAGE_KEY_PERMANENT = 'hideB24BannerForever';
    const HIDE_DURATION_MS = 2 * 60 * 60 * 1000; // 2 часа
    const now = Date.now();

    if (localStorage.getItem(STORAGE_KEY_PERMANENT) === 'true') return;

    const hideUntil = parseInt(localStorage.getItem(STORAGE_KEY_TIME), 10);
    if (!isNaN(hideUntil) && now < hideUntil) return;

    const banner = document.createElement('div');
    banner.className = 'b24-banner';
    banner.innerHTML = `
      <div class="b24-banner__content">
        <div class="b24-banner__text">
            <span>
                Оцените документацию REST
            </span>
            <a href="/poll-bar.html" class="b24-banner__button" style="display: none">Оставить отзыв</a>
            <div class="b24-banner__stars" title="Оцените от 1 до 5">
              ★★★★★
            </div>
        </div>
          
        <div class="b24-banner__actions">
          <span class="b24-banner__close" title="Закрыть">✖</span>
        </div>
      </div>
    `;

    Object.assign(banner.style, {
        position: 'fixed',
        bottom: '0',
        left: '0',
        right: '0',
        backgroundColor: '#3FC0F0',
        color: 'white',
        padding: '15px 20px',
        fontSize: '16px',
        zIndex: '9999',
        boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
    });

    const content = banner.querySelector('.b24-banner__content');
    Object.assign(content.style, {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px',
        textAlign: 'center',
    });

    const text = banner.querySelector('.b24-banner__text');
    Object.assign(text.style, {
        flex: '1 1 60%',
    });

    // Стили кнопки и крестика
    const actions = banner.querySelector('.b24-banner__actions');
    Object.assign(actions.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    });

    const button = banner.querySelector('.b24-banner__button');
    Object.assign(button.style, {
        backgroundColor: 'white',
        color: '#3FC0F0',
        padding: '8px 16px',
        textDecoration: 'none',
        borderRadius: '4px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    });

    const close = banner.querySelector('.b24-banner__close');
    Object.assign(close.style, {
        cursor: 'pointer',
        fontSize: '20px',
        color: 'white',
    });

    const root = document.getElementById('root');
    if (root) {
        root.style.paddingBottom = '150px';
    }

    close.addEventListener('click', function () {
        banner.remove();
        localStorage.setItem(STORAGE_KEY_TIME, (Date.now() + HIDE_DURATION_MS).toString());
        if (root) root.style.paddingBottom = '';
    });

    document.body.appendChild(banner);

    const STORAGE_KEY_RATING = 'b24StarRating';
    const savedRating = parseInt(localStorage.getItem(STORAGE_KEY_RATING), 10);
    const stars = banner.querySelector('.b24-banner__stars');

    Object.assign(stars.style, {
        width: '100px',
        margin: 'auto',
        marginTop: '10px',
        fontSize: '20px',
        cursor: 'pointer',
        color: 'white',
        userSelect: 'none',
    });

    let hoverRating = 0;
    let isRated = !isNaN(savedRating);

    function renderStars(active) {
        stars.textContent = '★★★★★';
        stars.innerHTML = [...stars.textContent].map((char, i) => (
            `<span style="color: ${i < active ? '#FFD700' : 'white'}">${char}</span>`
        )).join('');
    }

    if (isRated) {
        renderStars(savedRating);
        stars.style.display = 'none';
        button.style.display = 'block';
        button.style.marginLeft = '10px';

        const textBlock = document.querySelector('.b24-banner__text');

        textBlock.style.justifyContent = 'center';
        textBlock.style.display = 'flex';
        textBlock.style.alignItems = 'center';

    } else {
        renderStars(0);

        stars.addEventListener('mousemove', function (e) {
            const rect = stars.getBoundingClientRect();
            const relativeX = e.clientX - rect.left;
            const starWidth = rect.width / 5;
            hoverRating = Math.ceil(relativeX / starWidth);
            renderStars(hoverRating);
        });

        stars.addEventListener('mouseleave', function () {
            renderStars(0);
        });
    }

    stars.addEventListener('click', function () {
        if (!isRated) {
            if (hoverRating > 0) {
                localStorage.setItem(STORAGE_KEY_RATING, hoverRating.toString());
                isRated = true;

                if (typeof ym === 'function') {
                    ym(98117665, 'reachGoal', `survey_star_${hoverRating}`);
                }
            } else {
                return;
            }
        }
        window.location.href = '/poll-bar.html';
    });

    window.addEventListener('message', function (event) {
        if (event.data?.formSubmitted) {
            localStorage.setItem(STORAGE_KEY_PERMANENT, 'true');
            banner.remove();
            if (root) root.style.paddingBottom = '';
        }
    });
}

function showCallWriterBanner(widthBanner = '95%')
{
    if (isIframe())
    {
        return;
    }

    const contentDivs = document.querySelectorAll('div.dc-toc__content');

    contentDivs.forEach((contentDiv) => {
        const ulElement = contentDiv.querySelector('ul.dc-toc__list');
        if (
            ulElement &&
            !contentDiv.querySelector('a.writer_banner_link')
        ) {

            const img = document.createElement('img');
            img.src = '/_images/banner_restapi_call.png';
            img.alt = 'Список вакансий';
            img.style.width = widthBanner;

            const link = document.createElement('a');
            link.href = 'https://careers.bitrix24.ru/jobs/customer-service/editor-IT/';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = 'writer_banner_link';
            link.appendChild(img);


            contentDiv.appendChild(link);
        }
    });

}

function showCallWriterBannerForMobile()
{
    if (isIframe())
    {
        return;
    }

    let wasVisible = false;

    function checkVisibleTocLists() {
        const visibleTocLists = Array.from(document.querySelectorAll('div.dc-toc__content'))
            .filter(el => el.offsetParent !== null);

        if (visibleTocLists.length >= 2 && !wasVisible) {
            wasVisible = true;
            showCallWriterBanner('100%');
        } else if (visibleTocLists.length < 2) {
            wasVisible = false;
        }
    }


    const observer = new MutationObserver(checkVisibleTocLists);

    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['style', 'class'],
    });

    setInterval(checkVisibleTocLists, 500);
}

document.addEventListener('DOMContentLoaded', function() {
    // showPollBanner();
    if (isMobile())
    {
        showCallWriterBannerForMobile();
    }
    else
    {
        showCallWriterBanner('95%');
        const observer =new MutationObserver(() => showCallWriterBanner('95%'));
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
    setMenuPosition();
    initB24items();
});


mainObserver.observe(document, { childList: true, subtree: true });

// Connecting external metrics
window.onload = function() {

    if (!isInsideIframe()) {
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){
                (m[i].a=m[i].a||[]).push(arguments)
            };
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {
                if (document.scripts[j].src === r) {
                    return;
                }
            }
            k = e.createElement(t),
                a = e.getElementsByTagName(t)[0];
            k.async = 1;
            k.src = r;
            a.parentNode.insertBefore(k,a);
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

        ym(98117665, "init", {
            clickmap: true,
            trackLinks: true,
            accurateTrackBounce: true
        });
    }
};

function isIframe()
{
    let inIframe = false;
    try {
        inIframe = window.self !== window.top;
    } catch (e) {
        inIframe = true;
    }
    return inIframe;

}
function isMobile() {
    return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}