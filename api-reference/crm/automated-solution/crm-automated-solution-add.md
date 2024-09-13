# Создать цифровое рабочее место crm.automatedsolution.add

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- здесь есть ссылка на файл data-types, надо проверить что там описан тип crm_dynamic_type (из смарт-процессов)

{% endnote %}

{% endif %}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Метод создаст новое цифровое рабочее место.

В облаке максимальное количество цифровых рабочих мест зависит от тарифа. В коробке максимальное количество зависит от технических ограничений.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено ниже) для создания цифрового рабочего места в виде структуры:

```js
"fields": {
    "title": "значение",
    "typeIds": []
}
```
 ||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **title***
[`string`](../../data-types.md) | Название цифрового рабочего места. На основании заголовка цифрового рабочего места будет строиться ссылка на соответствующий раздел на портале ||
|| **typeIds**
[`crm_dynamic_type.id[]`](../data-types.md) | Массив идентификаторов смарт-процессов, которые нужно привязать к этому рабочему месту.

Если смарт-процесс до этого был привязан к другому рабочему месту или к CRM, то после привязки к новому рабочему месту, он оттуда пропадет.

Цифровое рабочее место без смарт-процессов не будет выводиться в левое меню. Но его можно будет найти в списке цифровых рабочих мест ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Создать цифровое рабочее место и сразу привязать к нему смарт-процессы

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"title":"HR","typeIds":[1,2,3]}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"title":"HR","typeIds":[1,2,3]},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.add
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.automatedsolution.add',
            {
                "fields": {
                    "title": "HR",
                    "typeIds": [
                        1,
                        2,
                        3
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
            'crm.automatedsolution.add',
            [
                'fields' =>
                [
                    'title' => 'HR',
                    'typeIds' => [1, 2, 3]
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Создать цифровое рабочее место без смарт-процессов

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"title":"HR"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.add
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"fields":{"title":"HR"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.add
        ```

    - JS

        ```js
        BX24.callMethod(
            'crm.automatedsolution.add',
            {
                "fields": {
                    "title": "HR"
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
            'crm.automatedsolution.add',
            [
                'fields' =>
                [
                    'title' => 'HR'
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
[`object`](../../data-types.md) | Объект с информацией о добавленном цифровом рабочем месте ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BX_EMPTY_REQUIRED",
    "error_description":"Не заполнено обязательное поле «Название»"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `LIMIT_EXCEEDED` | Превышено количество доступных цифровых рабочих мест ||
|| `BX_EMPTY_REQUIRED` | Не заполнено обязательное поле ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-update.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-list.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)