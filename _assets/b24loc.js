const localization = {

    github: "https://github.com/bitrix-tools/b24-rest-docs/",
    searchUrl: "https://util.1c-bitrix.ru/documentation/rest/search.php?q=",
    searchCaption: "Начните искать нужные статьи",
    searchNoResult: "К сожалению, по вашему запросу мы ничего не нашли. Попробуйте переформулировать",
    searchPlacehoder: "Поиск...",
    githubEdit: "Изменить на GitHub"
};

function getLocalizedString(key) {
    return localization[key];
}