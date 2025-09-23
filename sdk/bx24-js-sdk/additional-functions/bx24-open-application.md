# Открыть всплывающее окно BX24.openApplication

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- список параметров надо разбить скорее всего на отдельные таблицы

{% endnote %}

{% endif %}

```js
void BX24.openApplication([
    Object parameters[
    Function closeCallback
    ]
]);
```

При вызове метода `BX24.openApplication` будет открыто всплывающее окно с фреймом приложения. Приложению будут переданы данные из параметра parameters. При закрытии всплывающего окна будет вызван обработчик closeCallback. Метод может контролировать размеры, заголовок, и лейбл сладера.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **parameters**
[`unknown`](../../../api-reference/data-types.md) | Объект с параметрами, которые будут переданы открываемому приложению в виде JSON-строки ||
|| **closeCallback**
[`unknown`](../../../api-reference/data-types.md) | Обработчик закрытия приложения ||
|| **bx24_width**
[`unknown`](../../../api-reference/data-types.md) | Ширина слайда ||
|| **bx24_label**
[`unknown`](../../../api-reference/data-types.md) | Заголовок плашки ||
|| **bx24_title**
[`unknown`](../../../api-reference/data-types.md) | Заголовок страницы ||
|| **bx24_leftBoundary**
[`unknown`](../../../api-reference/data-types.md) | Слайдер во всю ширину с отступом слева. Не может быть одновременно с bx24_width. ||
|#

Для плейсментов `CRM_*_LIST_MENU` заблокировано.

## Примеры

Единый пример для BX24.openApplication и [BX24.closeApplication](./bx24-close-application.md)

```js
<script src="//api.bitrix24.com/api/v1/"></script>
<?
// разбор входных данных
$placementOptions = array();
if(array_key_exists('PLACEMENT_OPTIONS', $_REQUEST))
{
    $placementOptions = json_decode($_REQUEST['PLACEMENT_OPTIONS'], true);
}

// если приложение не развернуто, выводим кнопку открытия, в противном случае закрытия
if(!isset($placementOptions['opened']))
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
                'opened': true // данные, передаваемые открываемому приложению
            },
            function()
            {
                // этот обработчик сработает, когда приложение будет закрыто
                alert('Application closed!')
            }
        );

        setTimeout(closeApplication, 15000); // автоматически закрыть через 15 секунд
    }

    function closeApplication()
    {
        BX24.closeApplication();
    }
</script>
```

Пример со слайдером

```js
BX24.openApplication(
    {
        'opened': true,
        'bx24_width': 450,// int
        'bx24_label': {
            'bgColor':'pink', // aqua/green/orange/brown/pink/blue/grey/violet
            'text': 'my task',
            'color': '#07ff0e',
        },
        'bx24_title': 'my title', // str
        //'bx24_leftBoundary': 300, //int
    },
    function()
    {
        console.log('Application closed!')
    }
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}