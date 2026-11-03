# Получить список значений справочника CRM v 3.0 crm.dictionary.<справочник>.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение лидов, сделок или других объектов CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.dictionary.<справочник>.list` возвращает значения справочника CRM с фильтром, сортировкой и постраничной навигацией. Справочник задает сегмент `<справочник>` в имени метода.

## Имя метода для справочника

#|
|| **Справочник** | **Метод** | **Где используется значение** ||
|| Типы сделок | `crm.dictionary.dealtype.list` | Поле `typeId` сделки ||
|| Типы контактов | `crm.dictionary.contacttype.list` | Поле `typeId` контакта ||
|| Типы компаний | `crm.dictionary.companytype.list` | Поле `typeId` компании ||
|| Обращения | `crm.dictionary.honorific.list` | Поле `honorificId` контакта и лида ||
|| Количество сотрудников | `crm.dictionary.employees.list` | Поле `employeesId` компании ||
|| Сферы деятельности | `crm.dictionary.industry.list` | Поле `industryId` компании ||
|| Источники | `crm.dictionary.source.list` | Поле `sourceId` сделки, лида, контакта и счета ||
|| Типы телефонов | `crm.dictionary.phonetype.list` | Ключ `valueTypeId` в поле `phone` ||
|| Типы электронной почты | `crm.dictionary.emailtype.list` | Ключ `valueTypeId` в поле `email` ||
|| Типы сайтов | `crm.dictionary.webtype.list` | Ключ `valueTypeId` в поле `web` ||
|| Типы мессенджеров | `crm.dictionary.imtype.list` | Ключ `valueTypeId` в поле `im` ||
|| Типы адресов | `crm.dictionary.addresstype.list` | Поле `typeId` адреса ||
|| Типы объектов CRM | `crm.dictionary.entitytype.list` | Поле `entityTypeId` ||
|| Группы стадий | `crm.dictionary.stagesemantic.list` | Поле `stageSemanticId` ||
|| Провайдеры дел | `crm.dictionary.activityprovider.list` | Поле `providerId` дела ||
|#

Имя метода пишется в нижнем регистре: `crm.dictionary.dealtype.list`, а не `crm.dictionary.dealType.list`. На имя в другом регистре или с неизвестным справочником метод отвечает ошибкой [«Метод не найден»](#method-not-found).

Одно значение по идентификатору возвращает метод [crm.dictionary.<справочник>.get](./crm-dictionary-get-rest-v3.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть для каждого значения. [Описание параметра](#select)

Если параметр не передан, метод возвращает все поля ||
|| **filter**
[`array`](../../../data-types.md) | Условия отбора значений в формате REST 3.0. [Описание параметра](#filter)

Если параметр не передан, метод возвращает все значения ||
|| **order**
[`object`](../../../data-types.md) | Сортировка в формате `{"поле": "направление"}`. [Описание параметра](#order) ||
|| **pagination**
[`object`](../../../data-types.md) | Параметры постраничной навигации. [Описание параметра](#pagination)

Если параметр не передан, справочники значений CRM возвращают первые 50 значений, остальные справочники — все значения ||
|#

### Параметр select {#select}

Состав полей у каждого справочника свой, он описан в разделе [Поля справочников](#fields).

Значения в ответе содержат только поля из `select`. Пустой массив `[]` возвращает все поля. Неизвестное поле вызывает ошибку `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`.

Путь через точку работает только для поля `types` справочника провайдеров дел: `types.name` возвращает названия типов дел без остальных ключей.

### Параметр filter {#filter}

Фильтр — массив условий. Метод соединяет условия массива логикой И. Условие записывается одним из способов:

- `["поле", "оператор", значение]` — например `["sort", ">=", 20]`
- `["поле", значение]` — оператор `=`, а для значения-массива `in`: `["id", ["CALL", "WEB"]]`

Операторы описаны в [обзоре REST 3.0](../../../rest-v3.md#operators). Набор операторов зависит от справочника, он указан в разделе [Поля справочников](#fields). Оператора `like` и поиска по части строки нет: `["name", "=", "Продажа"]` найдет только значение с точно таким названием.

Значение должно соответствовать типу поля: число для `integer`, `true` или `false` для `boolean`, строка для `string`. Строка `"10"` для поля `sort` или `"N"` для поля `isSystem` вызывает ошибку валидации.

Чтобы соединить условия логикой ИЛИ, передайте группу — объект с ключами:

- `type` — значение `filter`
- `logic` — `and` или `or`, по умолчанию `and`
- `negative` — `true` инвертирует группу. Работает только в справочниках значений CRM и в справочнике `entitytype`
- `conditions` — массив условий и вложенных групп

Пример: тип сделки `SALE` или типы с сортировкой больше 40.

```json
{
    "filter": [
        {
            "type": "filter",
            "logic": "or",
            "conditions": [
                ["id", "=", "SALE"],
                ["sort", ">", 40]
            ]
        }
    ]
}
```

Если `filter` передан строкой, числом или объектом вида `{"id": "SALE"}`, метод отвечает ошибкой `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`.

### Параметр order {#order}

Объект, где ключ — имя поля, а значение — направление сортировки:

- `ASC` — по возрастанию
- `DESC` — по убыванию

Регистр направления не важен. Поля, по которым можно сортировать, указаны в разделе [Поля справочников](#fields).

Если `order` не передан, значения справочников значений CRM идут по возрастанию `sort`, группы стадий — по `id`, остальные — в том порядке, в котором их хранит Битрикс24.

### Параметр pagination {#pagination}

#|
|| **Название**
`тип` | **Описание** ||
|| **limit**
[`integer`](../../../data-types.md) | Количество значений на странице. Значения больше `1000` уменьшаются до `1000`. Ноль, отрицательное и нечисловое значение вызывают ошибку.

По умолчанию: `50` ||
|| **page**
[`integer`](../../../data-types.md) | Номер страницы, начиная с `1`. Смещение вычисляется как `(page - 1) × limit`. Ноль и отрицательное значение возвращают первую страницу.

Если передан `page`, смещение задает он, а не `offset` ||
|| **offset**
[`integer`](../../../data-types.md) | Количество значений, которые нужно пропустить от начала списка. Отрицательное значение вызывает ошибку.

По умолчанию: `0` ||
|#

{% note warning "" %}

Неизвестные ключи в `pagination` метод не проверяет. Если передать `{"size": 10}` вместо `{"limit": 10}`, ошибки не будет, и ответ вернет до 50 значений.

{% endnote %}

Ответ не содержит общего количества значений. Если на странице вернулось меньше значений, чем указано в `limit`, это последняя страница.

## Поля справочников {#fields}

Справочники различаются составом полей, операторами фильтра и полями сортировки. Описание полей с признаками `filterable` и `sortable` возвращает метод [crm.dictionary.<справочник>.field.list](./index.md#field-methods).

### Справочники значений CRM {#crm-values}

Справочники `dealtype`, `contacttype`, `companytype`, `honorific`, `employees`, `industry`, `source`. Значения этих справочников можно создавать, изменять и удалять методами [crm.dictionary.<справочник>.add](./crm-dictionary-add-rest-v3.md), [crm.dictionary.<справочник>.update](./crm-dictionary-update-rest-v3.md) и [crm.dictionary.<справочник>.delete](./crm-dictionary-delete-rest-v3.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор значения, например `SALE` или `EMPLOYEES_2`. Приложение передает это значение в поле элемента CRM, например в `typeId` сделки ||
|| **name**
[`string`](../../../data-types.md) | Название значения ||
|| **sort**
[`integer`](../../../data-types.md) | Порядок сортировки ||
|| **isSystem**
[`boolean`](../../../data-types.md) | Признак стандартного значения. Возможные значения:

- `true` — стандартное значение, его нельзя удалить
- `false` — значение можно удалить ||
|#

Фильтр — по всем полям, операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`. Оператор `between` — только для `sort`. Сортировка — по `id`, `name`, `sort`.

### Типы связи {#communication-types}

Справочники `phonetype`, `emailtype`, `webtype`, `imtype` — типы телефонов, электронной почты, сайтов и мессенджеров. Приложение передает идентификатор типа в ключе `valueTypeId` значения множественного поля, например `{"valueTypeId": "WORK", "value": "+79990000000"}`.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор типа, например `WORK` или `MOBILE` ||
|| **name**
[`string`](../../../data-types.md) | Полное название, например «Рабочий телефон». Может быть `null` ||
|| **nameShort**
[`string`](../../../data-types.md) | Короткое название, например «Рабочий». Может быть `null` ||
|| **isDeprecated**
[`boolean`](../../../data-types.md) | Признак устаревшего типа. Возможные значения:

- `true` — тип устарел, например `SKYPE` или `ICQ`
- `false` — тип действует ||
|#

Фильтр — по всем полям, операторы `=`, `!=`, `in`. Сортировка — по всем полям.

### Типы адресов {#address-types}

Справочник `addresstype` — типы адресов контакта и компании, например юридический или фактический.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор типа адреса, например `6` ||
|| **name**
[`string`](../../../data-types.md) | Символьный код типа, например `REGISTERED` ||
|| **title**
[`string`](../../../data-types.md) | Название типа, например «Юридический адрес» ||
|#

Фильтр — по всем полям, операторы `=`, `!=`, `in`. Сортировка — по всем полям.

### Группы стадий {#stage-semantics}

Справочник `stagesemantic` — группы, к которым относится стадия элемента CRM.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор группы. Возможные значения:

- `P` — в работе
- `S` — успех
- `F` — провал ||
|| **name**
[`string`](../../../data-types.md) | Название группы ||
|#

Фильтр — по всем полям, операторы `=`, `!=`, `in`. Сортировка — по всем полям.

### Типы объектов CRM {#entity-types}

Справочник `entitytype` содержит только системные типы объектов: лид, сделку, контакт, компанию, предложение, счет, документ и документ компании. Смарт-процессов в нем нет, их идентификаторы `entityTypeId` возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md).

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор типа объекта `entityTypeId`, например `2` для сделки ||
|| **code**
[`string`](../../../data-types.md) | Символьный код типа, например `Deal` или `SmartInvoice` ||
|| **title**
[`string`](../../../data-types.md) | Название типа ||
|#

Фильтр — по всем полям, операторы `=`, `!=`, `>`, `>=`, `<`, `<=`, `in`. Оператор `between` — только для `id`. Сортировка — по всем полям.

### Провайдеры дел {#activity-providers}

Справочник `activityprovider` — провайдеры дел CRM: универсальное дело, встреча, звонок, письмо, задача и другие.

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор провайдера, например `CRM_TODO` или `VOXIMPLANT_CALL` ||
|| **name**
[`string`](../../../data-types.md) | Название провайдера ||
|| **isAvailable**
[`boolean`](../../../data-types.md) | Признак, что провайдер доступен в Битрикс24. Возможные значения:

- `true` — доступен
- `false` — недоступен, например не подключена нужная функция ||
|| **isActive**
[`boolean`](../../../data-types.md) | Признак, что провайдер включен. Возможные значения:

- `true` — включен
- `false` — выключен. Например, провайдер внешнего канала `CRM_EXTERNAL_CHANNEL` выключен, пока к Битрикс24 не подключен внешний канал ||
|| **types**
[`object[]`](../../../data-types.md) | Типы дел провайдера. У каждого типа есть идентификатор `providerTypeId`, название `name` и объект `directions` с названиями направлений, например `{"incoming": "Входящий звонок", "outgoing": "Исходящий звонок"}` ||
|| **defaultTypeId**
[`string`](../../../data-types.md) | Тип дела по умолчанию, например `CALL`. Может быть `null` ||
|| **capabilities**
[`string[]`](../../../data-types.md) | Возможности дел провайдера, например `calendar`, `completion`, `timeline` ||
|#

Фильтр — только по полям `id`, `isAvailable`, `isActive`, операторы `=`, `!=`, `in`. Сортировка — только по `id`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.dictionary.dealtype.list`

{% endnote %}

Примеры получают типы сделок, которые можно удалить, — первую страницу из трех значений по возрастанию сортировки. Для другого справочника замените имя метода по таблице выше и проверьте поля в `select`, `filter` и `order` по разделу [Поля справочников](#fields).

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","sort"],"filter":[["isSystem","=",false]],"order":{"sort":"ASC"},"pagination":{"limit":3}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.dictionary.dealtype.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"select":["id","name","sort"],"filter":[["isSystem","=",false]],"order":{"sort":"ASC"},"pagination":{"limit":3},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.dictionary.dealtype.list
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DictionaryListResult = {
      items: {
        id: string
        name: string
        sort: number
      }[]
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<DictionaryListResult>(
        'crm.dictionary.dealtype.list',
        {
          select: ['id', 'name', 'sort'],
          filter: [
            ['isSystem', '=', false],
          ],
          order: {
            sort: 'ASC',
          },
          pagination: {
            limit: 3,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Deal types:', result.items)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(B24Js.ApiVersion.v3).call`.

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function listDealTypes() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.dictionary.dealtype.list',
            {
              select: ['id', 'name', 'sort'],
              filter: [
                ['isSystem', '=', false],
              ],
              order: {
                sort: 'ASC',
              },
              pagination: {
                limit: 3,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Deal types:', result.items)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listDealTypes)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.dictionary.dealtype.list"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "select": ["id", "name", "sort"],
                "filter": [
                    ["isSystem", "=", False],
                ],
                "order": {"sort": "ASC"},
                "pagination": {"limit": 3},
            },
            prefer_version=3,
        )
        for item in response["result"]["items"]:
            print(item["id"], item["name"], item["sort"])
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"code: {error.code}",
            f"message: {error.error.message}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.dictionary.dealtype.list',
                [
                    'select' => ['id', 'name', 'sort'],
                    'filter' => [
                        ['isSystem', '=', false],
                    ],
                    'order' => [
                        'sort' => 'ASC',
                    ],
                    'pagination' => [
                        'limit' => 3,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```js
    BX24.callMethod(
        'crm.dictionary.dealtype.list',
        {
            select: ['id', 'name', 'sort'],
            filter: [
                ['isSystem', '=', false],
            ],
            order: {
                sort: 'ASC',
            },
            pagination: {
                limit: 3,
            },
        },
        result => {
            if (result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.dictionary.dealtype.list',
        [
            'select' => ['id', 'name', 'sort'],
            'filter' => [
                ['isSystem', '=', false],
            ],
            'order' => [
                'sort' => 'ASC',
            ],
            'pagination' => [
                'limit' => 3,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.dictionary.dealtype.list", b24.Params{
    	"select": []string{"id", "name", "sort"},
    	"filter": []any{
    		[]any{"isSystem", "=", false},
    	},
    	"order": b24.Params{
    		"sort": "ASC",
    	},
    	"pagination": b24.Params{
    		"limit": 3,
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.dictionary.dealtype.list: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "items")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа items")
    }

    var items []struct {
    	ID   string `json:"id"`
    	Name string `json:"name"`
    	Sort int    `json:"sort"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name, it.Sort)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "items": [
            {
                "id": "COMPLEX",
                "name": "Комплексная продажа",
                "sort": 20
            },
            {
                "id": "GOODS",
                "name": "Продажа товара",
                "sort": 30
            },
            {
                "id": "SERVICES",
                "name": "Продажа услуги",
                "sort": 40
            }
        ]
    },
    "time": {
        "start": 1793715427,
        "finish": 1793715427.786939,
        "duration": 0.7869389057159424,
        "processing": 0,
        "date_start": "2026-11-03T17:17:07+03:00",
        "date_finish": "2026-11-03T17:17:07+03:00",
        "operating_reset_at": 1793716020,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.items**
[`array`](../../../data-types.md) | Массив значений справочника текущей страницы. Если под фильтр ничего не подходит или страница за пределами списка, массив пустой ||
|| **result.items[]**
[`object`](../../../data-types.md) | Значение справочника. Состав полей задает параметр `select`. [Описание полей](#fields) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта запроса",
        "validation": [
            {
                "message": "В поле `sort` требуется тип данных `int` для такого запроса",
                "field": "sort"
            }
        ]
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `sort` | В поле `sort` требуется тип данных `int` для такого запроса | Передайте в условии фильтра значение типа поля ||
|| `#FIELD#` | В DTO `#DTO#` в поле `#FIELD#` требуется наличие атрибута `Filterable` для такого запроса | Поле не участвует в фильтре. Поля для фильтра — в разделе [Поля справочников](#fields) ||
|| `#FIELD#` | В DTO `#DTO#` в поле `#FIELD#` требуется наличие атрибута `Sortable` для такого запроса | Поле не участвует в сортировке. Поля для сортировки — в разделе [Поля справочников](#fields) ||
|#

#### Ошибки фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение фильтра `#FILTER#` | Проверьте условие из текста ошибки, операторы и поддержку `negative` — по разделу [Поля справочников](#fields) ||
|| `-` | Не удается распознать выражение фильтра `Operator "between" requires an array only with 2 items.` | Передайте для `between` массив из двух значений: `["sort", "between", [20, 40]]` ||
|#

#### Неизвестный оператор фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNFILTEROPERATOREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестный оператор фильтра `#OPERATOR#` | Используйте операторы из раздела [Поля справочников](#fields). Оператора `like` нет ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля в `select`, `filter` или `order` по разделу [Поля справочников](#fields) ||
|#

#### Ошибка сортировки

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDORDEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение сортировки `#ORDER#` | Передайте `order` объектом, например `{"sort":"DESC"}`, с направлением `ASC` или `DESC` ||
|#

#### Ошибка постраничной навигации

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDPAGINATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать параметр пагинации `#PAGINATION#` | Передайте в `limit` положительное число, в `offset` — неотрицательное ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Вызовите метод от имени пользователя с правом на чтение лидов, сделок или других объектов CRM ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.dictionary.dealtype.list`. Имя справочника возьмите из таблицы в начале страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-dictionary-get-rest-v3.md)
- [{#T}](./crm-dictionary-add-rest-v3.md)
- [{#T}](./crm-dictionary-update-rest-v3.md)
- [{#T}](./crm-dictionary-delete-rest-v3.md)
