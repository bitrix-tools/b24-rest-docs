# Закрыть окно с приложением BX24.closeApplication

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

```js
void BX24.closeApplication();
```

Метод `BX24.closeApplication` закрывает открытое модальное окно с приложением (открытым как через [BX24.openApplication](./bx24-open-application.md), так и через модальное окно обработчика мест встраивания `CRM_*_LIST_MENU`).

Рекомендуется к использованию в `CRM_*_LIST_MENU`, например, для показа кнопки закрытия. (По умолчанию у пользователей нет никакого способа вернуться в CRM кроме закрытия всплывающего окна по крестику в углу окна.)

## Пример

Единый пример для [BX24.openApplication](./bx24-open-application.md) и BX24.closeApplication.

```php
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

{% include [Сноска о примерах](../../../_includes/examples.md) %}