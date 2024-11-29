const GITHUB_REPO_BASE_URL = "https://github.com/bitrix-tools/b24-rest-docs/";
var LOGO_EXISTS = false;

function createSeparator () {
    var divider = document.createElement('div');
    divider.className = 'dc-divider-control dc-divider-control_vertical dc-controls__divider';
    return divider;
}

function createLink( url, buttonCaption, svgPath, additionalClass) {
    // Create the link element

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

document.addEventListener('DOMContentLoaded', function() {
    initB24items();
    setMenuPosition();
});

function closePopup() {
    const resultContainer = document.querySelector('.search-results-container');
    if (resultContainer) {
        resultContainer.style.display = 'none';
    }
}

function addSearchResults () {
    // Search results popup
    const resultContainer = document.createElement('div');

    resultContainer.classList.add('search-results-container');
    resultContainer.style.setProperty('position', 'fixed', 'important');
    // resultContainer.style.top = '100%';
    // resultContainer.style.left = '0';
    // resultContainer.style.width = '100%';
    resultContainer.style.height = '500px';
    resultContainer.style.overflowY = 'auto';
    resultContainer.style.backgroundColor = '#fff';
    resultContainer.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    resultContainer.style.zIndex = '9999';
    resultContainer.style.display = 'none';
    resultContainer.style.padding = '10px';

    const searchContainer = document.querySelector('.search-container');
    const higherLevelContainer = document.body;
    higherLevelContainer.appendChild(resultContainer);

    resultContainer.style.top = `${searchContainer.getBoundingClientRect().bottom + window.scrollY}px`;
    resultContainer.style.width = '700px';
    resultContainer.style.left = `${searchContainer.getBoundingClientRect().right - 700}px`;
}

// Creates the search bar
function addSearchField() {

    const existingSearchInput = document.querySelector('.bx-search-input');
    const existingLogo = document.querySelector('.pc-logo__icon');

    if (!existingSearchInput && (existingLogo.width > 0)) {

        const searchContainer = document.createElement('div');
        searchContainer.style.position = 'relative';
        searchContainer.style.flex = '0 0 auto';
        searchContainer.style.marginLeft = '20px';
        searchContainer.style.width = '500px';
        searchContainer.classList.add('search-container');

        // Search text field
        const searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Поиск...';
        searchInput.style.padding = '10px 5px';
        searchInput.style.fontSize = '16px';
        searchInput.style.borderRadius = '4px';
        searchInput.style.border = '1px solid #ccc';
        searchInput.style.width = '100%';
        searchInput.classList.add('bx-search-input');

        let typingTimer;
        const typingDelay = 800;

        searchInput.addEventListener('input', function () {
            clearTimeout(typingTimer);

            const resultContainer = document.querySelector('.search-results-container');
            const query = searchInput.value.trim();
            if (query.length > 2) {
                typingTimer = setTimeout(function () {
                    performSearch(query, resultContainer);
                }, typingDelay);
            } else {
                showHint();
            }
        });

        searchInput.addEventListener('focus', function () {

            const resultContainer = document.querySelector('.search-results-container');

            if (searchInput.value.trim().length === 0) {
                showHint();
            } else {
                resultContainer.style.display = 'block';
            }
        });

        searchContainer.appendChild(searchInput);

        const clearButton = document.createElement('span');
        clearButton.textContent = '×';
        clearButton.style.position = 'absolute';
        clearButton.style.right = '10px';
        clearButton.style.top = '50%';
        clearButton.style.transform = 'translateY(-50%)';
        clearButton.style.cursor = 'pointer';
        clearButton.style.color = '#888';
        clearButton.style.fontSize = '20px';
        clearButton.style.userSelect = 'none';
        searchContainer.appendChild(clearButton);

        clearButton.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.focus();
            // resultContainer.style.display = 'none';
            showHint();
        });

        // Add the search bar into top menu container
        const menu = document.querySelector('.pc-desktop-navigation__navigation');
        if (menu) {
            menu.appendChild(searchContainer);
        }

        addSearchResults();

        document.addEventListener('click', function(event) {
            if (!searchContainer.contains(event.target)) {
                closePopup();
            }
        });

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closePopup();
            }
        });

        function showHint() {
            resultContainer = document.querySelector('.search-results-container');

            // text-align: center; color: #666; width: 66.67%; margin: 0 auto;

            resultContainer.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; width: 66.67%; margin: 0 auto; text-align: center;">
                    <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M56.6536 62.8186C52.8102 65.3422 48.2117 66.8102 43.2703 66.8102C29.7864 66.8102 18.8555 55.8793 18.8555 42.3953C18.8555 28.9114 29.7864 17.9805 43.2703 17.9805C56.7543 17.9805 67.6852 28.9114 67.6852 42.3953C67.6852 47.3367 66.2172 51.9352 63.6936 55.7786L76.3834 68.4684C77.8804 69.9654 77.8804 72.3925 76.3834 73.8895L74.7645 75.5084C73.2675 77.0054 70.8404 77.0054 69.3434 75.5084L56.6536 62.8186ZM60.7095 42.3953C60.7095 52.0267 52.9017 59.8345 43.2703 59.8345C33.6389 59.8345 25.8311 52.0267 25.8311 42.3953C25.8311 32.7639 33.6389 24.9561 43.2703 24.9561C52.9017 24.9561 60.7095 32.7639 60.7095 42.3953Z" fill="#DFE0E3"></path>
                    </svg>
                    <p>Начните искать нужные статьи</p>
                </div>
            `;
            resultContainer.style.display = 'block';
        }
    }
}

function fillResults(data) {
    var resultContainer = document.querySelector('.search-results-container');

    if (resultContainer === null) {
        addSearchResults();
        resultContainer = document.querySelector('.search-results-container');
    }

    resultContainer.innerHTML = '';

    if (data.result === 'ok' && data.items.length > 0) {

        data.items.forEach(item => {
            const resultItem = document.createElement('div');
            resultItem.style.padding = '10px 5px';

            // Create the full link with title
            const titleLink = document.createElement('a');
            titleLink.textContent = item.title;
            titleLink.href = item.link;
            titleLink.style.textDecoration = 'none';
            titleLink.style.color = '#000';
            titleLink.style.fontSize = '16px';
            titleLink.style.display = 'block';

            resultItem.appendChild(titleLink);

            // Split the link into parts to create breadcrumbs
            let urlParts = item.link.split('/').filter(Boolean);

            // Exclude the last part if it's a file (e.g., ends with ".html")
            if (urlParts.length > 0 && urlParts[urlParts.length - 1].includes('.')) {
                urlParts.pop();
            }

            const breadcrumbs = [];
            let cumulativePath = '';

            urlParts.forEach((part, index) => {
                cumulativePath += `/${part}`;
                const breadcrumb = document.createElement('a');
                breadcrumb.href = cumulativePath;
                breadcrumb.textContent = part;
                breadcrumb.style.textDecoration = 'none';
                breadcrumb.style.color = '#666';
                breadcrumb.style.fontSize = '12px';
                breadcrumb.style.marginRight = '5px';

                breadcrumbs.push(breadcrumb);

                if (index < urlParts.length - 1) {
                    const separator = document.createElement('span');
                    separator.textContent = '/';
                    separator.style.color = '#666';
                    separator.style.marginRight = '5px';
                    breadcrumbs.push(separator);
                }
            });

            // Create a container for breadcrumbs
            const breadcrumbContainer = document.createElement('div');
            breadcrumbContainer.style.marginTop = '5px';
            breadcrumbContainer.style.display = 'flex';
            breadcrumbContainer.style.flexWrap = 'wrap';

            breadcrumbs.forEach(breadcrumb => breadcrumbContainer.appendChild(breadcrumb));

            resultItem.appendChild(breadcrumbContainer);
            resultContainer.appendChild(resultItem);
        });

        resultContainer.style.display = 'block';
    } else {
        showNoResultsMessage(resultContainer);
    }
}

function showNoResultsMessage(resultContainer) {
    resultContainer.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; width: 66.67%; margin: 0 auto; text-align: center;">
            <svg width="92" height="92" viewBox="0 0 92 92" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M56.6536 62.8186C52.8102 65.3422 48.2117 66.8102 43.2703 66.8102C29.7864 66.8102 18.8555 55.8793 18.8555 42.3953C18.8555 28.9114 29.7864 17.9805 43.2703 17.9805C56.7543 17.9805 67.6852 28.9114 67.6852 42.3953C67.6852 47.3367 66.2172 51.9352 63.6936 55.7786L76.3834 68.4684C77.8804 69.9654 77.8804 72.3925 76.3834 73.8895L74.7645 75.5084C73.2675 77.0054 70.8404 77.0054 69.3434 75.5084L56.6536 62.8186ZM60.7095 42.3953C60.7095 52.0267 52.9017 59.8345 43.2703 59.8345C33.6389 59.8345 25.8311 52.0267 25.8311 42.3953C25.8311 32.7639 33.6389 24.9561 43.2703 24.9561C52.9017 24.9561 60.7095 32.7639 60.7095 42.3953Z" fill="#DFE0E3"></path>
            </svg>
            <p>К сожалению, по вашему запросу мы ничего не нашли. Попробуйте переформулировать</p>
        </div>
    `;
    resultContainer.style.display = 'block';
}

function performSearch(query, resultContainer) {

    const url = `https://util.1c-bitrix.ru/documentation/rest/search.php?q=${encodeURIComponent(query)}`;
    const searchInput = document.querySelector('.bx-search-input');

    searchInput.classList.add('loading');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            fillResults(data);
            searchInput.classList.remove('loading');
        })
        .catch(error => {
            console.error('Error while searching:', error);
            resultContainer.style.display = 'none';
            resultContainer.innerHTML = '';
            searchInput.classList.remove('loading');
        });
}

function initB24itemsIfReady() {
    if (document.readyState === 'complete') {
        initB24items();
    } else {
        window.addEventListener('load', function() {
            LOGO_EXISTS = true;
            initB24items();
        });
    }
}

// onload
const mainObserver = new MutationObserver(function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'childList' && document.readyState === 'complete') {
            initB24items();
            mainObserver.disconnect(); 

            const targetElement = document.querySelector('.pc-layout__navigation');
            const parentElement = targetElement ? targetElement.parentElement : document.body;

            const dynamicObserver = new MutationObserver(handleMutations);
            dynamicObserver.observe(parentElement, { childList: true, subtree: true });

            break;
        }
    }
});

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

function checkVisibility(element) {
    const style = window.getComputedStyle(element);
    return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
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
                `?title=${encodeURIComponent(`Страница ${TITLE}`)}` +
                `&body=${encodeURIComponent(`Ссылка на страницу: ${currentUrl}`)}`;

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

function initB24items() {    
    addB24Buttons();
    // addSearchField();
}

function addCopyIconsToCodeElements() {
    const codeElements = document.querySelectorAll('code');

    codeElements.forEach(codeElement => {
        const copyIcon = document.createElement('span');
        copyIcon.innerHTML = '📋';
        copyIcon.style.cursor = 'pointer';
        copyIcon.style.marginLeft = '5px';
        copyIcon.style.display = 'none';

        codeElement.style.position = 'relative';
        codeElement.appendChild(copyIcon);

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
        codeElement.appendChild(tooltip);

        codeElement.addEventListener('mouseenter', () => {
            copyIcon.style.display = 'inline';
        });

        codeElement.addEventListener('mouseleave', () => {
            copyIcon.style.display = 'none';
        });

        copyIcon.addEventListener('click', (event) => {
            event.stopPropagation();
            event.preventDefault();
            const textToCopy = codeElement.textContent.replace('📋Copied!', '').trim();
            navigator.clipboard.writeText(textToCopy).then(() => {
                tooltip.style.display = 'block';
                setTimeout(() => {
                    tooltip.style.display = 'none';
                }, 2000); 
            }).catch(err => {
                console.error('Error of copying: ', err);
            });
        });
    });
}

initB24itemsIfReady();

mainObserver.observe(document, { childList: true, subtree: true });

window.onload = function() {
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

    addCopyIconsToCodeElements();
};