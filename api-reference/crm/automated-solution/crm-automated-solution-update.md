# Изменить цифровое рабочее место crm.automatedsolution.update

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- здесь есть ссылка на файл data-types, надо проверить что там описан тип crm_dynamic_type (из смарт-процессов)

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу crm

Метод обновляет существующие настройки цифрового рабочего места с идентификатором `id`. Если какое-то из полей не было передано, его значение останется прежним.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../data-types.md) | Идентификатор цифрового рабочего места. Может быть получен из ответа метода [crm.automatedsolution.add](./crm-automated-solution-add.md) (result.automatedSolution.id), который был вызван при добавлении цифрового рабочего места, или [crm.automatedsolution.list](./crm-automated-solution-list.md). Так же можно воспользоваться разделом «Цифровые рабочие места» на портале Битрикс24 — колонка `ID` в списке цифровых рабочих мест ||
|| **fields***
[`object`](../data-types.md) | Значения полей (подробное описание приведено ниже) для создания цифрового рабочего места в виде структуры:

```js
"fields": {
    "title": "значение",
    "typeIds": []
}
```
||
|#

### Параметр fields

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../data-types.md) | Название цифрового рабочего места.

Будьте внимательны с изменением поля `title`. Так как ссылка на цифровое рабочее место строится на основании названия, при его изменении изменится и ссылка на цифровое рабочее место ||
|| **typeIds**
[`crm_dynamic_type.id[]`](../data-types.md) | Массив идентификаторов смарт-процессов, которые нужно привязать к этому рабочему месту.

Чтобы изменить список привязанных смарт-процессов, нужно передать поле `typeIds` с желаемым набором смарт-процессов.

{% note warning %}

Настройки переписываются полностью. При изменении списка привязанных смарт-процессов, надо передавать набор `typeIds` целиком, либо опустить ключ `typeIds` вообще 

{% endnote %}

 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Изменить название цифрового рабочего места

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"title":"HR & Customer Success"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"title":"HR & Customer Success"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.automatedsolution.update',
            {
                "id": 238,
                "fields": {
                    "title": "HR & Customer Success"
                }
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    console.info(result.data());
                }
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'title' => 'HR & Customer Success'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Изменить список привязанных смарт-процессов

    Допустим к цифровому рабочему месту с `id` = `267` были привязаны два смарт-процесса — один с `id` = `14`, а другой — с `id` = `158`. Если мы хотим, чтобы в цифровом рабочем месте остался только один смарт-процесс, то передаем поле `typeIds`, содержащее только нужные смарт-процессы:

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[14]}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[14]},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.automatedsolution.update',
            {
                "id": 238,
                "fields": {
                    "typeIds": [
                        14
                    ]
                }
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    console.info(result.data());
                }
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'typeIds' => [14]
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

3. Отвязать все смарт-процессы

    Чтобы отвязать все смарт-процессы от цифрового рабочего места, нужно передать пустой массив в качестве `typeIds`.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[]}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.update
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"id":238,"fields":{"typeIds":[]},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.update
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.automatedsolution.update',
            {
                "id": 238,
                "fields": {
                    "typeIds": []
                }
            },
            function(result) {
                if (result.error()) {
                    console.error(result.error());
                } else {
                    console.info(result.data());
                }
            }
        );
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.automatedsolution.update',
            [
                'id' => 238,
                'fields' =>
                [
                    'typeIds' => []
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "automatedSolution": {
            "id": 1,
            "title": "HR",
            "typeIds": [
                1,
                2,
                3
            ]
        }
    },
    "time": {
        "start": 1715849396.642359,
        "finish": 1715849396.954623,
        "duration": 0.31226396560668945,
        "processing": 0.0068209171295166016,
        "date_start": "2024-05-16T11:49:56+03:00",
        "date_finish": "2024-05-16T11:49:56+03:00",
        "operating_reset_at": 1715849996,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **automatedSolution**
[`object`](../../data-types.md) | Объект с информацией об обновленном цифровом рабочем месте ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"BX_EMPTY_REQUIRED",
    "error_description":"Не заполнено обязательное поле"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-list.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)
