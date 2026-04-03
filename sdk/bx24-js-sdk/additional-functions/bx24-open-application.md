# Открыть всплывающее окно BX24.openApplication

Метод `BX24.openApplication` открывает всплывающее окно с фреймом приложения. В открываемое приложение можно передать параметры и обработчик закрытия.

```js
void BX24.openApplication([Object params], [Function closeCallback], [Object settings])
```

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **params**
`object` | Объект параметров, который будет передан открываемому приложению ||
|| **closeCallback**
`function` | Функция, которая будет вызвана после закрытия всплывающего окна ||
|| **settings**
`object` | Дополнительные настройки окна. Ключи из `settings` автоматически добавляются в `params` с префиксом `bx24_` ||
|#

### Параметр settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **width**
`integer` | Ширина слайдера. Передается как `bx24_width` ||
|| **label**
`object` | Параметры плашки. Передается как `bx24_label` ||
|| **title**
`string` | Заголовок страницы. Передается как `bx24_title` ||
|| **leftBoundary**
`integer` | Отступ слайдера слева. Передается как `bx24_leftBoundary`. Не используется одновременно с `width` ||
|#

> В некоторых контекстах открытия окна параметры `bx24_label.bgColor` и `bx24_label.text` могут не применяться. При этом `bx24_label.color` может влиять на цвет элементов интерфейса окна, например, иконки закрытия

## Пример кода

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
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-close-application.md)
- [{#T}](./bx24-open-path.md)
