# Открыть всплывающее окно BX24.openApplication

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Метод `BX24.openApplication` открывает всплывающее окно с фреймом приложения. В открываемое приложение можно передать параметры и обработчик закрытия.

Метод работает только внутри фрейма приложения в Битрикс24. Вызывайте его после инициализации библиотеки в обработчике [BX24.init](../system-functions/bx24-init.md). Собственный scope методу не нужен: он управляет интерфейсом, а не обращается к REST API.

```js
BX24.openApplication(params?: object, closeCallback?: callable, settings?: object): void;
```

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **params**
`object` | Необязательный параметр. Произвольные параметры для открываемого приложения. Ключи и значения объекта определяет разработчик приложения. Данные передаются в параметре запроса `PLACEMENT_OPTIONS` в формате JSON ||
|| **closeCallback**
`callable` | Необязательный параметр. Функция вызывается без аргументов после закрытия всплывающего окна [(подробное описание)](#close-callback) ||
|| **settings**
`object` | Необязательный параметр. Дополнительные настройки окна. Ключи из `settings` автоматически добавляются в `params` с префиксом `bx24_` ||
|#

### Параметр params {#params}

Объект `params` передает данные из исходного приложения в приложение, открытое во всплывающем окне. Например, `{ opened: true }` будет передан как `{"opened":true}`.

В открытом приложении прочитайте параметр запроса `PLACEMENT_OPTIONS` и преобразуйте его из JSON. В PHP это можно сделать так:

```php
$params = [];
if (array_key_exists('PLACEMENT_OPTIONS', $_REQUEST))
{
    $params = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
}
```

### Параметр settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **width**
`integer` | Необязательный параметр. Ширина слайдера. Передается как `bx24_width` ||
|| **label**
`object` | Необязательный параметр. Параметры плашки окна. Передается как `bx24_label` ||
|| **title**
`string` | Необязательный параметр. Заголовок страницы. Передается как `bx24_title` ||
|| **leftBoundary**
`integer` | Необязательный параметр. Отступ слайдера слева. Передается как `bx24_leftBoundary`. Не используется одновременно с `width` ||
|#

#### Параметр label {#label}

#|
|| **Название**
`тип` | **Описание** ||
|| **bgColor**
`string` | Необязательный параметр. Цвет фона плашки в формате CSS, например `pink` или `#ff69b4` ||
|| **text**
`string` | Необязательный параметр. Текст плашки ||
|| **color**
`string` | Необязательный параметр. Цвет текста и элементов интерфейса окна в формате CSS, например `#07ff0e` ||
|#

{% note warning "" %}

В некоторых контекстах открытия окна параметры `bx24_label.bgColor` и `bx24_label.text` могут не применяться. При этом `bx24_label.color` может влиять на цвет элементов интерфейса окна, например, иконки закрытия.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Единый пример для `BX24.openApplication` и [BX24.closeApplication](./bx24-close-application.md):

```php
<script src="//api.bitrix24.tech/api/v1/"></script>
<?
$placementOptions = array();
if (array_key_exists('PLACEMENT_OPTIONS', $_REQUEST))
{
    $placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
}

if (!isset($placementOptions['opened']))
{
?>
    <span onclick="openApplication()">Open</span>
<?
}
else
{
?>
    <span onclick="closeApplication()">Close</span>
<?
}
?>
<script>
    function openApplication()
    {
        BX24.openApplication(
            {
                opened: true
            },
            function()
            {
                alert('Application closed!');
            }
        );

        setTimeout(closeApplication, 15000);
    }

    function closeApplication()
    {
        BX24.closeApplication();
    }
</script>
```

### Пример со слайдером

```js
BX24.init(() => {
    BX24.openApplication(
        { opened: true },
        function () {
            console.log('Application closed');
        },
        {
            width: 450,
            label: {
                bgColor: 'pink',
                text: 'my task',
                color: '#07ff0e'
            },
            title: 'my title'
        }
    );
});
```

## Обработка ответа {#close-callback}

Метод не возвращает данные (`void`). Если передать функцию `closeCallback`, она будет вызвана без аргументов после закрытия всплывающего окна. Обработчик сообщает только о закрытии окна и не содержит результат работы открытого приложения.

## Обработка ошибок

Кодов ошибок метод не возвращает. Функция `closeCallback` не получает объект результата или ошибки.

## Продолжите изучение

- [{#T}](./bx24-close-application.md)
- [{#T}](./bx24-open-path.md)
