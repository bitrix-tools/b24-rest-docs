# Получить список цифровых рабочих мест crm.automatedsolution.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователи с административным доступом к разделу CRM

Метод вернет массив настроек цифровых рабочих мест. Каждый элемент массива — это структура, аналогичная ответу на запрос [crm.automatedsolution.get](./crm-automated-solution-get.md).

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`object`](../../data-types.md) | Список для сортировки в формате `{"field_1": "value_1", ... "field_N": "value_N"}`, где ключ — поле, а значение — `ASC` или `DESC`. Доступные для сортировки поля:
- `id`
- `title` 
||
|| **filter**
[`object`](../../data-types.md) | Объект для фильтрации выбранных цифровых рабочих мест в формате `{"field_1": "value_1", ... "field_N": "value_N"}`. Доступные для фильтрации поля:
- `id`
- `title`
 
Фильтр может иметь неограниченную вложенность и количество условий. По умолчанию все условия соединяются друг с другом как `AND` (логическое И). Если нужно использовать `OR` (Логическое ИЛИ), то можно передать специальный ключ `logic` со значением `OR`.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, начинающиеся с «мол»
    - `"%мол"` — ищем значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищем значения, не начинающиеся с «мол»
    - `"%мол"` — ищем значения, не заканчивающиеся на «мол»
    - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` - не равно
||
|| **start**
[`integer`](../../data-types.md) | Параметр используется для управления постраничной навигацией.
 
Размер страницы результатов всегда статичный: 50 записей.
 
Чтобы выбрать вторую страницу результатов необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.
 
Формула расчета значения параметра `start`:
 
`start = (N-1) * 50`, где `N` — номер нужной страницы
 ||
|#

## Примеры кода

1. Получить все цифровые рабочие места, отсортированные по убыванию `id`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"id":"DESC"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"id":"DESC"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.automatedsolution.list",
            {
                "order": {
                    "id": "DESC",
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
            'crm.automatedsolution.list',
            [
                'order' => [
                    'id' => 'DESC'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получить все цифровые рабочие места, название которых начинается с «HR»

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"%=title":"HR%"}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"filter":{"%=title":"HR%"},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.automatedsolution.list",
            {
                "filter": {
                    "%=title": "HR%"
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
            'crm.automatedsolution.list',
            [
                'filter' => [
                    '%=title' => 'HR%'
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

3. Получить все цифровые места, у которых название начинается с «HR» или «Customer» и `id` больше `100` с сортировкой по названию

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"title":"ASC"},"filter":{">id":100,"0":{"logic":"OR","0":{"%=title":"HR%"},"1":{"%=title":"Customer%"}}}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.automatedsolution.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"title":"ASC"},"filter":{">id":100,"0":{"logic":"OR","0":{"%=title":"HR%"},"1":{"%=title":"Customer%"}}},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.automatedsolution.list
        ```

    - JS

        ```js
        BX24.callMethod(
            "crm.automatedsolution.list",
            {
                "order": {
                    "title": "ASC"
                },
                "filter": {
                    ">id": 100,
                    "0": {
                        "logic": "OR",
                        "0": {
                            "%=title": "HR%"
                        },
                        "1": {
                            "%=title": "Customer%"
                        }
                    }
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
            'crm.automatedsolution.list',
            [
                'order' => [
                    'title' => 'ASC'
                ],
                'filter' => [
                    '>id' => 100,
                    '0' => [
                        'logic' => 'OR',
                        '0' => [
                            '%=title' => 'HR%'
                        ],
                        '1' => [
                            '%=title' => 'Customer%'
                        ]
                    ]
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
		"automatedSolutions": [
			{
				"id": 238,
				"title": "HR",
				"typeIds": [
					129
				]
			},
			{
				"id": 240,
				"title": "Customer Success",
				"typeIds": []
			},
			{
				"id": 267,
				"title": "R&D",
				"typeIds": [
					14,
					158
				]
			}
		]
	},
	"total": 3,
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
|| **automatedSolutions**
[`object`](../../data-types.md) | Массив объектов с информацией о выбранных оплатах ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ACCESS_DENIED",
    "error_description":"Недостаточно прав"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав ||
|| `INVALID_ARG_VALUE` | Неверное значение входных аргументов. Подробности можно узнать в тексте ошибки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-automated-solution-add.md)
- [{#T}](./crm-automated-solution-update.md)
- [{#T}](./crm-automated-solution-get.md)
- [{#T}](./crm-automated-solution-delete.md)
- [{#T}](./crm-automated-solution-fields.md)