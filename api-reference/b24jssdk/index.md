# Установка и использование B24JsSDK

[B24JsSDK](https://github.com/bitrix24/b24jssdk) - это официальная библиотека для работы с REST API Битрикс24 на JavaScript. В отличие от [BX24.JS](../bx24-js-sdk/index.md), B24JsSDK имеет следующие преимущества:

1. Работает как на фронтенде в браузере, так и на бэкенде в Node.js;
2. Поддерживает авторизацию через токены и вебхуки;
3. Форматирует данные REST API в соответствующие типы JavaScript (числа, IBAN-счета, даты и т.д.);
4. Использует современные возможности языка - async/await, promises, AsyncGenerator;
5. Автоматически генерирует уникальные идентификаторы запросов, что упрощает отладку;
6. И многое другое!

## Установка

Есть несколько способов установки SDK:

- Для генерации и серверного рендеринга приложений на Node.js и Nuxt;
- Для использования UMD-версии SDK в браузере через CDN или с локального сервера.

### Установка в Node.js / Nuxt

Подробности можно найти в [документации B24JsSDK](https://bitrix-tools.github.io/b24jssdk/guide/getting-started.html).

### Использование в браузере

Подключите библиотеку через CDN, добавив следующий тег в HTML-файл:

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
```

Или скачайте UMD-версию с [unpkg.com](https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js) и добавьте её в проект:

```html
<script src="/path/to/umd/index.min.js"></script>
```

После подключения библиотека будет доступна через глобальную переменную `B24Js`. Пример инициализации:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bitrix24 Frame Demo</title>
</head>
<body>
<p>See the result in the developer console</p>
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
<script>
    document.addEventListener('DOMContentLoaded', async () => {
        try
        {
            let $b24 = await B24Js.initializeB24Frame();
        }
        catch (error)
        {
            console.error(error);
        }
    });
</script>
</body>
</html>
```

## Использование с вебхуками

Для работы с локальными вебхуками используйте их только в [серверных приложениях](https://bitrix-tools.github.io/b24jssdk/guide/getting-started.html).

Пример серверного использования SDK: [https://github.com/bitrix24/b24sdk-examples/tree/main/js/05-node-hook](https://github.com/bitrix24/b24sdk-examples/tree/main/js/05-node-hook)

## Использование во фронтенд-приложениях

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
<script type="module">
try
{
    const $logger = B24Js.LoggerBrowser.build('local-app', true);
    
    const $b24 = await B24Js.initializeB24Frame();
    $b24.setLogger(
        B24Js.LoggerBrowser.build('Core')
    );
    
    $logger.warn('B24Frame.init');
    
    const response = await $b24.callMethod(
        'crm.item.add',
        {
            entityTypeId: B24Js.EnumCrmEntityTypeId.deal,
            fields: {
                title: `New Deal ${B24Js.Text.getUuidRfc4122()}`,
                typeId: 'SALE',
                stageId: 'NEW'
            }
        }
    );
    
    const newDeal = response.getData().result.item;
    
    $logger.info(
        `${B24Js.Text.getDateForLog()} crm.item.add >>`,
        {
            newId: newDeal.id,
            createdTime: B24Js.Text.toDateTime(newDeal.createdTime).toFormat('HH:mm:ss'),
            fields: newDeal
        }
    );
    
    // Открываем добавленную сделку в стандартном слайдере
    $b24.slider.openPath(
        $b24.slider.getUrl(`/crm/deal/details/${newDeal.id}/`),
        950
    );
}
catch( error )
{
    console.error(error);
}
</script>
```

## Примеры

Примеры использования SDK можно найти в репозитории: [https://github.com/bitrix24/b24sdk-examples/tree/main/js](https://github.com/bitrix24/b24sdk-examples/tree/main/js):

- Создание пользовательского интерфейса в стиле Битрикс24;
- Использование вебхуков;
- Авторизация через токены;
- Использование UMD-версии в браузере;
- Использование SDK на бэкенде в Node.js.
