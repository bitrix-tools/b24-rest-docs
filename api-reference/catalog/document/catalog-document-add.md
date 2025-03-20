# Добавить документ складского учета catalog.document.add

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указана обязательность параметров
- отсутствует ответ в случае ошибки
- нет примеров на др. языках
  
{% endnote %}

{% endif %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может подписаться: любой пользователь

## Описание

```http
catalog.document.add(fields)
```

Метод добавляет [`документ`](../enum/catalog-enum-get-store-document-types.md) складского учёта.
Если операция успешна, возвращается `id` добавленного документа.

## Параметры

#|
|| **Параметр** | **Описание** ||
|| **fields**
[`array`](../../data-types.md)| Параметры добавляемого документа. Поля соответствуют доступному списку полей [`fields`](catalog-document-get-fields.md). ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"S","responsibleId":"1","dateModify":"2000-01-01T00:00:00+02:00","dateCreate":"2000-01-01T00:00:00+02:00","createdBy":"1","modifiedBy":"1","currency":"USD","status":"S","dateStatus":"2000-01-01T00:00:00+02:00","dateDocument":"2000-01-01T00:00:00+02:00","statusBy":"1","total":"100","commentary":"first document.","title":"Новый документ"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/catalog.document.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"docType":"S","responsibleId":"1","dateModify":"2000-01-01T00:00:00+02:00","dateCreate":"2000-01-01T00:00:00+02:00","createdBy":"1","modifiedBy":"1","currency":"USD","status":"S","dateStatus":"2000-01-01T00:00:00+02:00","dateDocument":"2000-01-01T00:00:00+02:00","statusBy":"1","total":"100","commentary":"first document.","title":"Новый документ"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.document.add
    ```

- JS

    ```js
    BX24.callMethod(
        'catalog.document.add',
        {
            'fields': {
                'docType': 'S',
                'responsibleId': '1',
                'dateModify': '2000-01-01T00:00:00+02:00',
                'dateCreate': '2000-01-01T00:00:00+02:00',
                'createdBy': '1',
                'modifiedBy': '1',
                'currency': 'USD',
                'status': 'S',
                'dateStatus': '2000-01-01T00:00:00+02:00',
                'dateDocument': '2000-01-01T00:00:00+02:00',
                'statusBy': '1',
                'total': '100',
                'commentary': 'first document.',
                'title': 'Новый документ',
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.document.add',
        [
            'fields' => [
                'docType' => 'S',
                'responsibleId' => '1',
                'dateModify' => '2000-01-01T00:00:00+02:00',
                'dateCreate' => '2000-01-01T00:00:00+02:00',
                'createdBy' => '1',
                'modifiedBy' => '1',
                'currency' => 'USD',
                'status' => 'S',
                'dateStatus' => '2000-01-01T00:00:00+02:00',
                'dateDocument' => '2000-01-01T00:00:00+02:00',
                'statusBy' => '1',
                'total' => '100',
                'commentary' => 'first document.',
                'title' => 'Новый документ',
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

