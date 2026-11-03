# Получить элемент CRM по идентификатору v 3.0 crm.<тип>.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на чтение элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.get` возвращает поля элемента CRM по идентификатору. Тип объекта задает сегмент `<тип>` в имени метода, состав полей в ответе — параметр `select`.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.get` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.get` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.get` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.get` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.get` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.get` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.get` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.get`, например `crm.smartprocess1038.get` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.get`, а не `crm.smartInvoice.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор элемента.

Идентификатор возвращает метод [crm.<тип>.add](./crm-entity-add-rest-v3.md) при создании элемента. Идентификаторы существующих элементов можно получить методом [crm.<тип>.list](./crm-entity-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей, которые нужно вернуть в ответе. [Описание параметра](#select)

Если параметр не передан, ответ содержит только `id` ||
|#

### Параметр select {#select}

Имена полей пишутся в camelCase: `title`, `stageId`, `assignedById`. Состав полей у каждого типа объекта свой, описания полей — на страницах:

- [поля сделки](./fields-deal.md)
- [поля лида](./fields-lead.md)
- [поля контакта](./fields-contact.md)
- [поля компании](./fields-company.md)
- [поля предложения](./fields-quote.md)
- [поля счета](./fields-smart-invoice.md)
- [поля моей компании](./fields-my-company.md)
- [поля смарт-процесса](./fields-smart-process.md)

Список полей возвращает метод [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).

Ответ содержит только поля из `select`. Поле `id` не добавляется автоматически — передайте его в списке, если оно нужно в ответе. Звездочка `*` не поддерживается: метод вернет ошибку неизвестного поля.

Связанные объекты запрашиваются по имени поля без суффикса `Id`: `assignedBy`, `createdBy`, `stage`, `category`. Есть два способа:

- имя связанного объекта целиком, например `assignedBy`, — ответ содержит все поля объекта. Для связанных элементов CRM — `contact`, `company` и других — возвращается только `id`
- путь через точку, например `assignedBy.firstName` или `stage.name`, — ответ содержит только выбранные поля объекта

Если связь не заполнена, связанный объект возвращается как `null`, а множественный, например `observers`, — как пустой массив.

Пользовательские поля передаются по имени, например `UF_CRM_1687529546`. Их список возвращает метод [crm.<тип>.field.custom.list](../fields/crm-entity-field-custom-list-rest-v3.md).

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.get`

{% endnote %}

Примеры получают элемент смарт-процесса с идентификатором типа `1038`: название, стадию с ее названием, ответственного с именем и фамилией, сумму и дату создания. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"select":["id","title","stageId","stage.name","assignedById","assignedBy.firstName","assignedBy.lastName","opportunity","currencyId","createdTime"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":15,"select":["id","title","stageId","stage.name","assignedById","assignedBy.firstName","assignedBy.lastName","opportunity","currencyId","createdTime"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type ItemGetResult = {
      item: {
        id: number
        title: string
        stageId: string
        assignedById: number
        opportunity: number
        currencyId: string
        createdTime: string
        stage: {
          name: string
        } | null
        assignedBy: {
          firstName: string
          lastName: string
        } | null
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<ItemGetResult>(
        'crm.smartprocess1038.get',
        {
          id: 15,
          select: [
            'id',
            'title',
            'stageId',
            'stage.name',
            'assignedById',
            'assignedBy.firstName',
            'assignedBy.lastName',
            'opportunity',
            'currencyId',
            'createdTime',
          ],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const item = response.getData()!.result.item
        console.info(item.title, item.stage?.name, item.assignedBy?.firstName)
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
      async function getItem() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.get',
            {
              id: 15,
              select: [
                'id',
                'title',
                'stageId',
                'stage.name',
                'assignedById',
                'assignedBy.firstName',
                'assignedBy.lastName',
                'opportunity',
                'currencyId',
                'createdTime',
              ],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const item = response.getData().result.item
          console.info(item.title, item.stage?.name, item.assignedBy?.firstName)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getItem)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 15,
                "select": [
                    "id",
                    "title",
                    "stageId",
                    "stage.name",
                    "assignedById",
                    "assignedBy.firstName",
                    "assignedBy.lastName",
                    "opportunity",
                    "currencyId",
                    "createdTime",
                ],
            },
            prefer_version=3,
        )
        item = response["result"]["item"]
        print(item)
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
                'crm.smartprocess1038.get',
                [
                    'id' => 15,
                    'select' => [
                        'id',
                        'title',
                        'stageId',
                        'stage.name',
                        'assignedById',
                        'assignedBy.firstName',
                        'assignedBy.lastName',
                        'opportunity',
                        'currencyId',
                        'createdTime',
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
        'crm.smartprocess1038.get',
        {
            id: 15,
            select: [
                'id',
                'title',
                'stageId',
                'stage.name',
                'assignedById',
                'assignedBy.firstName',
                'assignedBy.lastName',
                'opportunity',
                'currencyId',
                'createdTime',
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
        'crm.smartprocess1038.get',
        [
            'id' => 15,
            'select' => [
                'id',
                'title',
                'stageId',
                'stage.name',
                'assignedById',
                'assignedBy.firstName',
                'assignedBy.lastName',
                'opportunity',
                'currencyId',
                'createdTime',
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.get", b24.Params{
    	"id": 15,
    	"select": []string{
    		"id",
    		"title",
    		"stageId",
    		"stage.name",
    		"assignedById",
    		"assignedBy.firstName",
    		"assignedBy.lastName",
    		"opportunity",
    		"currencyId",
    		"createdTime",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.get: %w", err)
    }

    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет item")
    }

    var item struct {
    	ID          int     `json:"id"`
    	Title       string  `json:"title"`
    	StageID     string  `json:"stageId"`
    	Opportunity float64 `json:"opportunity"`
    	CurrencyID  string  `json:"currencyId"`
    	Stage       struct {
    		Name string `json:"name"`
    	} `json:"stage"`
    	AssignedBy struct {
    		FirstName string `json:"firstName"`
    		LastName  string `json:"lastName"`
    	} `json:"assignedBy"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.Title, item.Stage.Name, item.AssignedBy.FirstName)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 15,
            "title": "Заявка на закупку оборудования",
            "stageId": "DT1038_69:PREPARATION",
            "assignedById": 1,
            "opportunity": 180000,
            "currencyId": "RUB",
            "createdTime": "2026-11-03T14:39:32+03:00",
            "stage": {
                "name": "Подготовка"
            },
            "assignedBy": {
                "firstName": "Мария",
                "lastName": "Петрова"
            }
        }
    },
    "time": {
        "start": 1793706172,
        "finish": 1793706172.777702,
        "duration": 0.7777020931243896,
        "processing": 0,
        "date_start": "2026-11-03T14:42:52+03:00",
        "date_finish": "2026-11-03T14:42:52+03:00",
        "operating_reset_at": 1793706720,
        "operating": 0
    }
}
```

Без параметра `select` метод возвращает только идентификатор:

```json
{
    "result": {
        "item": {
            "id": 15
        }
    },
    "time": {
        "start": 1793705990,
        "finish": 1793705990.170455,
        "duration": 0.1704549789428711,
        "processing": 0,
        "date_start": "2026-11-03T14:39:50+03:00",
        "date_finish": "2026-11-03T14:39:50+03:00",
        "operating_reset_at": 1793706540,
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
[`object`](../../../data-types.md) | Значения полей элемента из `select`. Связанные объекты вложены под своими именами, например `stage` и `assignedBy`. Описание полей — на странице полей типа объекта, ссылки — в описании [параметра select](#select) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION",
        "message": "Неизвестное поле `name` для сущности `EmployeeDto`"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `#ID#` не найдена | Проверьте идентификатор элемента. Элемента с таким `id` нет у этого типа объекта или он удален ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` элемента ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте `id` числом ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `#DTO#` | Проверьте имя поля в `select` по странице полей типа объекта. Если ошибка называет связанный объект, например `EmployeeDto`, неверно имя поля после точки: у ответственного это `firstName` и `lastName`, а не `name` ||
|#

#### Ошибка формата select

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDSELECTEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не удается распознать выражение select `#VALUE#` | Передайте `select` массивом строк, например `["id","title"]` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-add-rest-v3.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
- [{#T}](./crm-entity-delete-rest-v3.md)
- [{#T}](../fields/crm-entity-field-list-rest-v3.md)
