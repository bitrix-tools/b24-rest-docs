# Получить реквизиты и контакты моей компании v 3.0 crm.mycompany.basic.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение компаний, счетов, документов CRM или документов КЭДО — достаточно права на любой из этих типов объектов

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.mycompany.basic.get` возвращает по идентификатору основные данные моей компании: название, телефоны, почту, реквизиты и банковские реквизиты.

Метод доступен без прав администратора CRM, которые нужны методу [crm.mycompany.get](./crm-entity-get-rest-v3.md). Например, данные своей компании получит сотрудник, который работает только со счетами или документами.

## Отличия от crm.mycompany.get

#|
|| **Что сравниваем** | **crm.mycompany.basic.get** | **crm.mycompany.get** ||
|| Кто может вызвать | Пользователь с правом на чтение компаний, счетов, документов CRM или документов КЭДО | Администратор CRM ||
|| Поля | Только `id`, `title`, `email`, `phone`, `requisites`, `bankRequisites` | Все поля моей компании, кроме реквизитов, включая пользовательские поля. [Поля моей компании](./fields-my-company.md) ||
|| Реквизиты | Реквизиты и банковские реквизиты в ответе | Нет. Реквизиты моей компании возвращает метод [crm.requisite.list](../requisites/crm-requisite-list-rest-v3.md) с фильтром по `ownerId` ||
|| Ответ без `select` | `id` и `title` | Только `id` ||
|| Компания не найдена | HTTP-статус 404 | HTTP-статус 400 ||
|#

Метод возвращает только компании из списка «Мои компании». Идентификатор обычной компании вызывает ошибку `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор моей компании. Идентификаторы можно получить методом [crm.mycompany.basic.list](./crm-my-company-basic-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть. [Описание параметра](#select)

По умолчанию: `["id", "title"]` ||
|#

### Параметр select {#select}

Доступные поля:

- `id` — идентификатор компании
- `title` — название компании
- `email` — адреса почты
- `phone` — телефоны
- `requisites` — реквизиты компании
- `bankRequisites` — банковские реквизиты компании

Поля вложенных объектов можно выбрать через точку: `phone.value`, `requisites.inn`, `bankRequisites.bankName`. Имя объекта целиком, например `requisites`, возвращает все его поля.

Другие поля, например `createdTime`, вызывают ошибку `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`. Описания доступных полей возвращают методы `crm.mycompany.basic.field.list` и `crm.mycompany.basic.field.get`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.mycompany.basic.get`

{% endnote %}

Примеры получают название, телефоны, почту, ИНН из реквизитов и названия банков моей компании с идентификатором `3`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3,"select":["id","title","phone","email","requisites.id","requisites.presetId","requisites.companyTitle","requisites.inn","bankRequisites.id","bankRequisites.bankName"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.mycompany.basic.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3,"select":["id","title","phone","email","requisites.id","requisites.presetId","requisites.companyTitle","requisites.inn","bankRequisites.id","bankRequisites.bankName"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.mycompany.basic.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type Multifield = {
      id: number
      valueTypeId: string
      value: string
    }

    type MyCompanyBasicGetResult = {
      item: {
        id: number
        title: string
        phone: Multifield[]
        email: Multifield[]
        requisites: { id: number, presetId: number, companyTitle: string, inn: string }[]
        bankRequisites: { id: number, bankName: string | null }[]
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<MyCompanyBasicGetResult>(
        'crm.mycompany.basic.get',
        {
          id: 3,
          select: [
            'id',
            'title',
            'phone',
            'email',
            'requisites.id',
            'requisites.presetId',
            'requisites.companyTitle',
            'requisites.inn',
            'bankRequisites.id',
            'bankRequisites.bankName',
          ],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const company = response.getData()!.result.item
        console.info(company.title, company.requisites.map(requisite => requisite.inn))
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
      async function getMyCompany() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.mycompany.basic.get',
            {
              id: 3,
              select: [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'requisites.companyTitle',
                'requisites.inn',
                'bankRequisites.id',
                'bankRequisites.bankName',
              ],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const company = response.getData().result.item
          console.info(company.title, company.requisites.map(requisite => requisite.inn))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getMyCompany)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.mycompany.basic.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 3,
                "select": [
                    "id",
                    "title",
                    "phone",
                    "email",
                    "requisites.id",
                    "requisites.presetId",
                    "requisites.companyTitle",
                    "requisites.inn",
                    "bankRequisites.id",
                    "bankRequisites.bankName",
                ],
            },
            prefer_version=3,
        )
        company = response["result"]["item"]
        print(company["title"], [requisite["inn"] for requisite in company["requisites"]])
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
                'crm.mycompany.basic.get',
                [
                    'id' => 3,
                    'select' => [
                        'id',
                        'title',
                        'phone',
                        'email',
                        'requisites.id',
                        'requisites.presetId',
                        'requisites.companyTitle',
                        'requisites.inn',
                        'bankRequisites.id',
                        'bankRequisites.bankName',
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
        'crm.mycompany.basic.get',
        {
            id: 3,
            select: [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'requisites.companyTitle',
                'requisites.inn',
                'bankRequisites.id',
                'bankRequisites.bankName',
            ],
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
        'crm.mycompany.basic.get',
        [
            'id' => 3,
            'select' => [
                'id',
                'title',
                'phone',
                'email',
                'requisites.id',
                'requisites.presetId',
                'requisites.companyTitle',
                'requisites.inn',
                'bankRequisites.id',
                'bankRequisites.bankName',
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
    res, err := client.Core().Call(ctx, "crm.mycompany.basic.get", b24.Params{
    	"id": 3,
    	"select": []string{
    		"id", "title", "phone", "email",
    		"requisites.id", "requisites.presetId", "requisites.companyTitle", "requisites.inn",
    		"bankRequisites.id", "bankRequisites.bankName",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.mycompany.basic.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var company struct {
    	ID         int    `json:"id"`
    	Title      string `json:"title"`
    	Requisites []struct {
    		ID           int    `json:"id"`
    		CompanyTitle string `json:"companyTitle"`
    		Inn          string `json:"inn"`
    	} `json:"requisites"`
    }
    if err := json.Unmarshal(raw, &company); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(company.ID, company.Title, len(company.Requisites))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 3,
            "title": "ООО Ромашка",
            "email": [
                {
                    "id": 7605,
                    "valueTypeId": "WORK",
                    "valueType": {
                        "id": "WORK",
                        "name": "Рабочий e-mail",
                        "nameShort": "Рабочий"
                    },
                    "value": "info@example.com"
                }
            ],
            "phone": [
                {
                    "id": 7637,
                    "valueTypeId": "WORK",
                    "valueType": {
                        "id": "WORK",
                        "name": "Рабочий телефон",
                        "nameShort": "Рабочий"
                    },
                    "value": "+79990000000"
                }
            ],
            "requisites": [
                {
                    "id": 3,
                    "presetId": 1,
                    "companyTitle": "ООО Ромашка",
                    "inn": "7700000000"
                },
                {
                    "id": 49,
                    "presetId": 1,
                    "companyTitle": "ООО Ромашка Сервис",
                    "inn": "7700000001"
                }
            ],
            "bankRequisites": [
                {
                    "id": 3,
                    "bankName": "Основной счет"
                }
            ]
        }
    },
    "time": {
        "start": 1793706809,
        "finish": 1793706809.06065,
        "duration": 0.06065011024475098,
        "processing": 0,
        "date_start": "2026-11-03T14:53:29+03:00",
        "date_finish": "2026-11-03T14:53:29+03:00",
        "operating_reset_at": 1793707380,
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
|| **result.item**
[`object`](../../../data-types.md) | Данные моей компании. Содержит только поля из `select`. [Описание объекта](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор компании ||
|| **title**
[`string`](../../../data-types.md) | Название компании ||
|| **email**
[`array`](../../../data-types.md) | Адреса почты. [Описание элемента](#multifield). Если адресов нет — пустой массив ||
|| **phone**
[`array`](../../../data-types.md) | Телефоны. [Описание элемента](#multifield). Если телефонов нет — пустой массив ||
|| **requisites**
[`array`](../../../data-types.md) | Реквизиты компании. Поля реквизита те же, что возвращает метод [crm.requisite.list](../requisites/crm-requisite-list-rest-v3.md): `id`, `ownerId`, `ownerTypeId`, `presetId`, `name`, `companyTitle`, `inn`, `kpp`, `ogrn`, `directorName` и другие. Если реквизитов нет — пустой массив ||
|| **bankRequisites**
[`array`](../../../data-types.md) | Банковские реквизиты всех реквизитов компании. [Описание элемента](#bank-requisite). Если банковских реквизитов нет — пустой массив ||
|#

#### Элемент email и phone {#multifield}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор значения ||
|| **valueTypeId**
[`string`](../../../data-types.md) | Тип значения, например `WORK` ||
|| **valueType**
[`object`](../../../data-types.md) | Тип значения: `id` — код, `name` — полное название, `nameShort` — краткое название ||
|| **value**
[`string`](../../../data-types.md) | Адрес почты или номер телефона ||
|#

#### Элемент bankRequisites {#bank-requisite}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита ||
|| **requisiteId**
[`integer`](../../../data-types.md) | Идентификатор реквизита, к которому относится банковский реквизит ||
|| **name**
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **bankName**
[`string`](../../../data-types.md) | Название банка ||
|| **bankAddress**
[`string`](../../../data-types.md) | Адрес банка ||
|| **bik**
[`string`](../../../data-types.md) | БИК ||
|| **bankAccountNumber**
[`string`](../../../data-types.md) | Номер счета ||
|| **bankAccountCurrency**
[`string`](../../../data-types.md) | Валюта счета ||
|| **correspondentAccountNumber**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **swift**
[`string`](../../../data-types.md) | SWIFT ||
|| **comments**
[`string`](../../../data-types.md) | Комментарий ||
|#

Незаполненные поля банковского реквизита приходят со значением `null`. Подробнее о банковских реквизитах — в описании метода [crm.<тип>.requisite.bankrequisite.get](../requisites/crm-entity-requisite-bank-requisite-get-rest-v3.md).

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `1` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Компания не найдена

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Компании с таким `id` нет или она не входит в список «Мои компании». Идентификаторы моих компаний возвращает метод [crm.mycompany.basic.list](./crm-my-company-basic-list-rest-v3.md) ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` компании ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `BasicCompanyDto` | Передайте в `select` только поля из [описания параметра](#select) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | У пользователя нет права на чтение ни компаний, ни счетов, ни документов CRM, ни документов КЭДО ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, `crm.mycompany.basic.get`, а не `crm.myCompany.basic.get` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-my-company-basic-list-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./fields-my-company.md)
- [{#T}](../requisites/crm-requisite-list-rest-v3.md)
