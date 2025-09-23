# Получить список контактов crm.contact.list

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «чтения» контактов

Метод `crm.contact.list` возвращает список контактов по фильтру. Является реализацией списочного метода для контактов.

Чтобы получить список компаний, привязанных к контакту, используйте метод [`crm.contact.company.items.get`](company/crm-contact-company-items-get.md)

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`string[]`][1] | Список полей, которые должны быть заполнены у контактов в выборке.

При выборке можно использовать маски:
- `'*'` — для выборки всех полей (без пользовательских и множественных)
- `'UF_*'` — для выборки всех пользовательских полей (без множественных)

Маски для выборки множественных полей нет. Для выборки множественных полей укажите нужные в списке выбора (`PHONE`, `EMAIL` и так далее).

Список доступных полей для выборки можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md).

По умолчанию берутся все поля — `'*'` + Пользовательские поля — `'UF_*'`
||
|| **filter**
[`object`][1] | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```

где:
- `field_n` — название поля, по которому будет отфильтрована выборка элементов
- `value_n` — значение фильтра

К ключам `field_n` можно добавить префикс, уточняющий работу фильтра.
Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN, в качестве значения передается массив
- `!@` — NOT IN, в качестве значения передается массив
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
    - `"мол%"` — ищет значения, начинающиеся с «мол»
    - `"%мол"` — ищет значения, заканчивающиеся на «мол»
    - `"%мол%"` — ищет значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Поля Телефон(`PHONE`), Почта(`EMAIL`), Сайт(`WEB`), Мессенджеры(`IM`), Ссылки(`LINK`) — множественные. По ним фильтры работают только на точное совпадение.

Также фильтр `LIKE` не работает с полями типа `crm_status`, `crm_contact`, `crm_company` — например, Тип контакта (`TYPE_ID`), Обращение (`HONORIFIC`) и так далее.

Список доступных полей для фильтрации можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md).

Ключ `logic` в фильтре не поддерживается. Для использования сложной логики в фильтре используйте метод [crm.item.list](../universal/crm-item-list.md)
||
|| **order**
[`object`][1] | Объект формата:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n,
}
```
где:
- `field_n` — название поля, по которому будет произведена сортировка выборки контактов
- `value_n` — значение типа `string`, равное:
    - `ASC` — сортировка по возрастанию
    - `DESC` — сортировка по убыванию

Список доступных полей для сортировки можно узнать с помощью метода [`crm.contact.fields`](crm-contact-fields.md)
||
|| **start**
[`integer`][1] | Параметр для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, передайте значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

Также смотрите описание [списочных методов](../../../settings/how-to-call-rest-api/list-methods-pecularities.md).

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Получить список контактов, у которых:
1. источником является CRM-Форма
2. имя и фамилия не пустые
3. имя или фамилия начинается на "И"
4. участвуют в экспорте
5. e-mail равен 'special-for@example.com'
6. идентификатор ответственного или 1, или 6
7. создан менее 6 месяцев назад

Задать  порядок сортировки выборки: имя и фамилия в порядке возрастания.

Для наглядности выбрать только необходимые поля:
- Идентификатор контакта
- Имя
- Фамилия
- E-mail
- Участвует ли в экспорте
- Ответственный
- Дата создания

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"SOURCE_ID":"CRM_FORM","!=NAME":"","!=LAST_NAME":"","=%NAME":"И%","=%LAST_NAME":"И%","EMAIL":"special-for@example.com","@ASSIGNED_BY_ID":[1,6],"IMPORT":"Y",">=DATE_CREATE":"**put_six_month_ago_date_here**"},"ORDER":{"LAST_NAME":"ASC","NAME":"ASC"},"SELECT":["ID","NAME","LAST_NAME","EMAIL","EXPORT","ASSIGNED_BY_ID","DATE_CREATE"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/crm.contact.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"SOURCE_ID":"CRM_FORM","!=NAME":"","!=LAST_NAME":"","=%NAME":"И%","=%LAST_NAME":"И%","EMAIL":"special-for@example.com","@ASSIGNED_BY_ID":[1,6],"IMPORT":"Y",">=DATE_CREATE":"**put_six_month_ago_date_here**"},"ORDER":{"LAST_NAME":"ASC","NAME":"ASC"},"SELECT":["ID","NAME","LAST_NAME","EMAIL","EXPORT","ASSIGNED_BY_ID","DATE_CREATE"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.contact.list
    ```

- JS

    ```js
    // callListMethod рекомендуется использовать, когда необходимо получить весь набор списочных данных и объём записей относительно невелик (до примерно 1000 элементов). Метод загружает все данные сразу, что может привести к высокой нагрузке на память при работе с большими объемами.
    
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(new Date().getMonth() - 6);
    
    try {
      const response = await $b24.callListMethod(
        'crm.contact.list',
        {
          filter: {
            "SOURCE_ID": "CRM_FORM",
            "!=NAME": "",
            "!=LAST_NAME": "",
            "=%NAME": "И%",
            "=%LAST_NAME": "И%",
            "EMAIL": "special-for@example.com",
            "@ASSIGNED_BY_ID": [1, 6],
            "IMPORT": "Y",
            ">=DATE_CREATE": sixMonthAgo.toISOString(),
          },
          order: {
            LAST_NAME: "ASC",
            NAME: "ASC",
          },
          select: [
            "ID",
            "NAME",
            "LAST_NAME",
            "EMAIL",
            "EXPORT",
            "ASSIGNED_BY_ID",
            "DATE_CREATE",
          ],
        },
        (result) => {
          result.error()
            ? console.error(result.error())
            : console.info(result.data())
          ;
        }
      );
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // fetchListMethod предпочтителен при работе с крупными наборами данных. Метод реализует итеративную выборку с использованием генератора, что позволяет обрабатывать данные по частям и эффективно использовать память.
    
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(new Date().getMonth() - 6);
    
    try {
      const generator = $b24.fetchListMethod('crm.contact.list', {
        filter: {
          "SOURCE_ID": "CRM_FORM",
          "!=NAME": "",
          "!=LAST_NAME": "",
          "=%NAME": "И%",
          "=%LAST_NAME": "И%",
          "EMAIL": "special-for@example.com",
          "@ASSIGNED_BY_ID": [1, 6],
          "IMPORT": "Y",
          ">=DATE_CREATE": sixMonthAgo.toISOString(),
        },
        order: {
          LAST_NAME: "ASC",
          NAME: "ASC",
        },
        select: [
          "ID",
          "NAME",
          "LAST_NAME",
          "EMAIL",
          "EXPORT",
          "ASSIGNED_BY_ID",
          "DATE_CREATE",
        ],
      }, 'ID');
      for await (const page of generator) {
        for (const entity of page) {
          console.log('Entity:', entity);
        }
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    
    // callMethod предоставляет ручной контроль над процессом постраничного получения данных через параметр start. Подходит для сценариев, где требуется точное управление пакетами запросов. Однако при больших объемах данных может быть менее эффективным по сравнению с fetchListMethod.
    
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth(new Date().getMonth() - 6);
    
    try {
      const response = await $b24.callMethod('crm.contact.list', {
        filter: {
          "SOURCE_ID": "CRM_FORM",
          "!=NAME": "",
          "!=LAST_NAME": "",
          "=%NAME": "И%",
          "=%LAST_NAME": "И%",
          "EMAIL": "special-for@example.com",
          "@ASSIGNED_BY_ID": [1, 6],
          "IMPORT": "Y",
          ">=DATE_CREATE": sixMonthAgo.toISOString(),
        },
        order: {
          LAST_NAME: "ASC",
          NAME: "ASC",
        },
        select: [
          "ID",
          "NAME",
          "LAST_NAME",
          "EMAIL",
          "EXPORT",
          "ASSIGNED_BY_ID",
          "DATE_CREATE",
        ],
      }, 0);
      const result = response.getData().result || [];
      for (const entity of result) {
        console.log('Entity:', entity);
      }
    } catch (error) {
      console.error('Request failed', error);
    }
    ```

- PHP

    ```php
    try {
        $sixMonthAgo = new DateTime();
        $sixMonthAgo->setDate((new DateTime())->getMonth() - 6);
    
        $response = $b24Service
            ->core
            ->call(
                'crm.contact.list',
                [
                    'filter' => [
                        'SOURCE_ID'      => 'CRM_FORM',
                        '!=NAME'         => '',
                        '!=LAST_NAME'    => '',
                        '=%NAME'         => 'И%',
                        '=%LAST_NAME'    => 'И%',
                        'EMAIL'          => 'special-for@example.com',
                        '@ASSIGNED_BY_ID' => [1, 6],
                        'IMPORT'         => 'Y',
                        '>=DATE_CREATE'  => $sixMonthAgo->format('Y-m-d\TH:i:s'),
                    ],
                    'order'  => [
                        'LAST_NAME' => 'ASC',
                        'NAME'      => 'ASC',
                    ],
                    'select' => [
                        'ID',
                        'NAME',
                        'LAST_NAME',
                        'EMAIL',
                        'EXPORT',
                        'ASSIGNED_BY_ID',
                        'DATE_CREATE',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching contact list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    const sixMonthAgo = new Date();
    sixMonthAgo.setMonth((new Date()).getMonth() - 6);

    BX24.callMethod(
        'crm.contact.list',
        {
            filter: {
                "SOURCE_ID": "CRM_FORM",
                "!=NAME": "",
                "!=LAST_NAME": "",
                "=%NAME": "И%",
                "=%LAST_NAME": "И%",
                "EMAIL": "special-for@example.com",
                "@ASSIGNED_BY_ID": [1, 6],
                "IMPORT": "Y",
                ">=DATE_CREATE": sixMonthAgo.toISOString(),
            },
            order: {
                LAST_NAME: "ASC",
                NAME: "ASC",
            },
            select: [
                "ID",
                "NAME",
                "LAST_NAME",
                "EMAIL",
                "EXPORT",
                "ASSIGNED_BY_ID",
                "DATE_CREATE",
            ],
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $sixMonthAgo = new DateTime();
    $sixMonthAgo->modify('-6 months');

    $result = CRest::call(
        'crm.contact.list',
        [
            'FILTER' => [
                'SOURCE_ID' => 'CRM_FORM',
                '!=NAME' => '',
                '!=LAST_NAME' => '',
                '=%NAME' => 'И%',
                '=%LAST_NAME' => 'И%',
                'EMAIL' => 'special-for@example.com',
                '@ASSIGNED_BY_ID' => [1, 6],
                'IMPORT' => 'Y',
                '>=DATE_CREATE' => $sixMonthAgo->format(DateTime::ATOM),
            ],
            'ORDER' => [
                'LAST_NAME' => 'ASC',
                'NAME' => 'ASC',
            ],
            'SELECT' => [
                'ID',
                'NAME',
                'LAST_NAME',
                'EMAIL',
                'EXPORT',
                'ASSIGNED_BY_ID',
                'DATE_CREATE',
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
	"result": [
		{
			"ID": "75",
			"NAME": "Анастасия",
			"LAST_NAME": "Ильина",
			"EXPORT": "Y",
			"ASSIGNED_BY_ID": "6",
			"DATE_CREATE": "2024-02-26T00:00:00+02:00",
			"EMAIL": [
				{
					"ID": "215",
					"VALUE_TYPE": "WORK",
					"VALUE": "special-for@example.com",
					"TYPE_ID": "EMAIL"
				}
			]
		},
		{
			"ID": "74",
			"NAME": "Артем",
			"LAST_NAME": "Исаев",
			"EXPORT": "Y",
			"ASSIGNED_BY_ID": "1",
			"DATE_CREATE": "2024-08-15T00:00:00+02:00",
			"EMAIL": [
				{
					"ID": "214",
					"VALUE_TYPE": "WORK",
					"VALUE": "special-for@example.com",
					"TYPE_ID": "EMAIL"
				}
			]
		},
		{
			"ID": "78",
			"NAME": "Артем",
			"LAST_NAME": "Исаев",
			"EXPORT": "Y",
			"ASSIGNED_BY_ID": "1",
			"DATE_CREATE": "2024-08-15T00:00:00+02:00",
			"EMAIL": [
				{
					"ID": "218",
					"VALUE_TYPE": "WORK",
					"VALUE": "special-for@example.com",
					"TYPE_ID": "EMAIL"
				}
			]
		},
		{
			"ID": "77",
			"NAME": "Инна",
			"LAST_NAME": "Кузнецова",
			"EXPORT": "Y",
			"ASSIGNED_BY_ID": "6",
			"DATE_CREATE": "2024-07-01T00:00:00+02:00",
			"EMAIL": [
				{
					"ID": "217",
					"VALUE_TYPE": "WORK",
					"VALUE": "special-for@example.com",
					"TYPE_ID": "EMAIL"
				}
			]
		},
		{
			"ID": "73",
			"NAME": "Иван",
			"LAST_NAME": "Петров",
			"EXPORT": "Y",
			"ASSIGNED_BY_ID": "1",
			"DATE_CREATE": "2024-02-20T00:00:00+02:00",
			"EMAIL": [
				{
					"ID": "213",
					"VALUE_TYPE": "WORK",
					"VALUE": "special-for@example.com",
					"TYPE_ID": "EMAIL"
				}
			]
		}
	],
	"total": 5,
	"time": {
		"start": 1723807142.916445,
		"finish": 1723807143.44846,
		"duration": 0.5320150852203369,
		"processing": 0.1967020034790039,
		"date_start": "2024-08-16T13:19:02+02:00",
		"date_finish": "2024-08-16T13:19:03+02:00"
	}
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`contact[]`](./crm-contact-get.md#contact) | Корневой элемент ответа. Массив, содержащий информацию о найденных контактах.

Поля отдельно взятого контакта конфигурируются параметром `select` ||
|| **total**
[`integer`][1] | Общее количество найденных контактов по заданным условиям ||
|| **next**
[`integer`][1] | Содержит значение, которое нужно передать в следующий запрос в параметр `start`, чтобы получить следующую порцию данных.

Параметр `next` появляется в ответе, если количество элементов, соответствующих вашему запросу, превышает значение `50` ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `-`     | `Access denied` | У пользователя нет прав на «Чтение» контактов ||
|| `-`     | `Parameter 'order' must be array` | В параметр `order` передан не массив ||
|| `-`     | `Parameter 'filter' must be array` | В параметр `filter` передан не массив ||
|| `-`     | `Failed to get list. General error` | Произошла неизвестная ошибка ||
|#

{% include [системные ошибки](./../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-contact-add.md)
- [{#T}](./crm-contact-update.md)
- [{#T}](./crm-contact-get.md)
- [{#T}](./crm-contact-delete.md)
- [{#T}](./crm-contact-fields.md)
- [{#T}](../../../tutorials/crm/how-to-get-lists/search-by-phone-and-email.md)

[1]: ../../data-types.md
