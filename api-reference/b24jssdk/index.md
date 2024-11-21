# Установка и использование B24JsSDK

B24JsSDK - это официальная и рекомендуемая библиотека для работы с REST API Битрикс24 на языке JavaScript. В отличие от библиотеки BX24.JS, B24JsSDK имеет целый ряд преимуществ:

1. Может использоваться не только во front-части приложений в браузере, но и в back-части на Node.js;
2. Авторизация через приложения и вебхуки;
3. Готовые методы форматирования данных REST API к соответствующим типам JavaScript и бизнес-форматам (числа, IBAN-счета, дата и т.д.);
4. Эффективное использование современных возможностей языка - использование async/await, promises, AsyncGenerator при выполнении списочных-запросов, и т.д.
5. Автогенерация и "проброс" уникальных идентификаторов исходящих запросов, что упрощает отладку в случае потери исходящих событий;
6. И многие другие.

## Установка

Существует несколько вариантов использования SDK:

- В режиме генерации, а также серверного рендеринга приложений на Node.js и Nuxt;
- В режиме UMD-версии SDK из браузера с подключением через CDN или со своего сервера.

### Установка в Node.js / Nuxt

Этот вопрос более подробно рассмотрен в документации, целиком посвященной [B24JsSDK](https://bitrix-tools.github.io/b24jssdk/guide/getting-started.html)

### Использование в браузере

Вы можете подключить библиотеку напрямую через CDN. Добавьте следующий тег <script> в ваш HTML-файл:

```html
<script src="https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js"></script>
```

Либо скачайте UMD-версию библиотеки с [unpkg.com](https://unpkg.com/@bitrix24/b24jssdk@latest/dist/umd/index.min.js) и добавьте её в ваш проект:

```html
<script src="/path/to/umd/index.min.js"></script>
```

После подключения библиотеки, она будет доступна через глобальную переменную [B24Js]. Пример инициализации:

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

## Использование со входящими вебхуками

Поскольку обращение к локальному вебхуку происходит с прямым указанием кода вебхука, мы настоятельно рекомендуем использовать вебхуки только в случае [серверного использования SDK](https://bitrix-tools.github.io/b24jssdk/guide/getting-started.html).

## Использование во front-end локальных и тиражных приложений

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
