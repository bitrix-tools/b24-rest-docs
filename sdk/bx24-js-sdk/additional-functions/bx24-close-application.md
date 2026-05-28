# Закрыть окно с приложением BX24.closeApplication

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Метод `BX24.closeApplication` отправляет команду на закрытие всплывающего окна с приложением.

Метод рекомендуется использовать в таких встройках, как `CRM_*_LIST_MENU` из раздела [Виджеты](https://apidocs.bitrix24.ru/api-reference/widgets/index.html). Например, можно добавить кнопку, которая закрывает окно приложения.

```js
void BX24.closeApplication([Function callback])
```

## Параметры

#|
|| **Название**
`тип` | **Описание** ||
|| **callback**
`function` | Функция обратного вызова, которая выполняется после отправки команды закрытия окна ||
|#

## Пример кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Единый пример для [BX24.openApplication](./bx24-open-application.md) и `BX24.closeApplication`:

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
            { opened: true },
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

setTimeout(function () {
    BX24.closeApplication();
}, 15000);
```

## Обработка ответа

Метод не возвращает данные (`void`).

## Продолжите изучение

- [{#T}](./bx24-open-application.md)
- [{#T}](./bx24-open-path.md)
