# Получить вид карточки v 3.0 crm.<тип>.detailpagelayout.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь. Дополнительный вид доступен участникам его аудитории и пользователю с правом изменять общий вид карточки. С параметром `userId` другого пользователя — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.detailpagelayout.get` возвращает вид карточки элемента CRM по идентификатору: разделы, поля в них, а у дополнительного вида еще название и аудиторию. Тип объекта задает сегмент `<тип>` в имени метода.

Если личный или общий вид еще не настраивали, метод возвращает вид по умолчанию.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.detailpagelayout.get` ||
|| Лид | `crm.lead.detailpagelayout.get` ||
|| Контакт | `crm.contact.detailpagelayout.get` ||
|| Компания | `crm.company.detailpagelayout.get` ||
|| Предложение | `crm.quote.detailpagelayout.get` ||
|| Счет | `crm.smartinvoice.detailpagelayout.get` ||
|| Документ CRM | `crm.smartdocument.detailpagelayout.get` ||
|| Документ КЭДО | `crm.smartb2edocument.detailpagelayout.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.detailpagelayout.get`, например `crm.smartprocess1038.detailpagelayout.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Методы видов карточки есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет.

Имя метода пишется в нижнем регистре: `crm.deal.detailpagelayout.get`, а не `crm.deal.detailPageLayout.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`string`](../../../data-types.md) | Идентификатор вида карточки — строка:

- `C<categoryId>:personal` — личный вид, например `C69:personal`
- `C<categoryId>:common` — общий вид, например `C69:common`
- число в строке, например `"17"`, — дополнительный вид

У лида и предложения воронок нет, их личный и общий вид — `personal` и `common`. Для повторных лидов у лида есть отдельные виды `personal_returning_customer` и `common_returning_customer`.

Вид должен относиться к воронке из `categoryId`. Идентификаторы личного и общего вида возвращают методы [crm.<тип>.detailpagelayout.getpersonallayoutid](./crm-entity-detail-page-layout-get-personal-layout-id-rest-v3.md) и [crm.<тип>.detailpagelayout.getcommonlayoutid](./crm-entity-detail-page-layout-get-common-layout-id-rest-v3.md), дополнительных — метод [crm.<тип>.detailpagelayout.list](./crm-entity-detail-page-layout-list-rest-v3.md) ||
|| **categoryId***
[`integer`](../../../data-types.md) | Идентификатор воронки. Виды карточки хранятся отдельно для каждой воронки.

Значение зависит от типа объекта:

- лид и предложение — только `0`, воронок у них нет
- сделка, контакт и компания — идентификатор воронки, `0` — воронка по умолчанию
- счет, документы и смарт-процесс — идентификатор воронки. Значение `0` метод заменяет идентификатором воронки по умолчанию

Идентификаторы воронок сделок, контактов, компаний и смарт-процессов можно получить методом [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md) ||
|| **userId**
[`integer`](../../../data-types.md) | Идентификатор пользователя, чей личный вид вернуть или от чьего имени проверить доступ к дополнительному виду. Передавать идентификатор другого пользователя может только администратор CRM.

По умолчанию — пользователь, который вызывает метод.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.detailpagelayout.get`

{% endnote %}

Примеры получают дополнительный вид `17` смарт-процесса с идентификатором типа `1038`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":0,"id":"17"}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.detailpagelayout.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":0,"id":"17","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.detailpagelayout.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type LayoutElement = {
      name: string
      optionFlags?: number
      options?: Record<string, unknown>
    }

    type LayoutSection = {
      name: string
      title: string
      elements: LayoutElement[]
    }

    type Layout = {
      id: string
      configuration: LayoutSection[]
      name: string | null
      audience: { type: string; id: number }[] | null
    }

    type LayoutGetResult = {
      item: Layout
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<LayoutGetResult>(
        'crm.smartprocess1038.detailpagelayout.get',
        { categoryId: 0, id: '17' },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.item.id, result.item.configuration)
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
      async function getLayout() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.detailpagelayout.get',
            { categoryId: 0, id: '17' },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.item.id, result.item.configuration)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getLayout)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.detailpagelayout.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={"categoryId": 0, "id": "17"},
            prefer_version=3,
        )
        result = response["result"]
        print(result["item"])
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
                'crm.smartprocess1038.detailpagelayout.get',
                ['categoryId' => 0, 'id' => '17']
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
        'crm.smartprocess1038.detailpagelayout.get',
        { categoryId: 0, id: '17' },
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
        'crm.smartprocess1038.detailpagelayout.get',
        ['categoryId' => 0, 'id' => '17']
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.detailpagelayout.get", b24.Params{"categoryId": 0, "id": "17"}, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.detailpagelayout.get: %w", err)
    }

    var layout struct {
    	ID            string  `json:"id"`
    	Name          *string `json:"name"`
    	Configuration []struct {
    		Name     string `json:"name"`
    		Title    string `json:"title"`
    		Elements []struct {
    			Name        string         `json:"name"`
    			OptionFlags *int           `json:"optionFlags"`
    			Options     map[string]any `json:"options"`
    		} `json:"elements"`
    	} `json:"configuration"`
    	Audience []struct {
    		Type string `json:"type"`
    		ID   int    `json:"id"`
    	} `json:"audience"`
    }
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет item")
    }
    if err := json.Unmarshal(raw, &layout); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(layout.ID, len(layout.Configuration))
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": "17",
            "configuration": [
                {
                    "name": "main",
                    "title": "О заявке",
                    "elements": [
                        {
                            "name": "TITLE"
                        },
                        {
                            "name": "STAGE_ID"
                        },
                        {
                            "name": "OPPORTUNITY_WITH_CURRENCY",
                            "optionFlags": 1
                        }
                    ]
                },
                {
                    "name": "additional",
                    "title": "Дополнительно",
                    "elements": [
                        {
                            "name": "ASSIGNED_BY_ID"
                        }
                    ]
                }
            ],
            "name": "Карточка для закупок и склада",
            "audience": [
                {
                    "type": "department",
                    "id": 47
                },
                {
                    "type": "user",
                    "id": 29
                }
            ]
        }
    },
    "time": {
        "start": 1793706656,
        "finish": 1793706656.382836,
        "duration": 0.38283610343933105,
        "processing": 0,
        "date_start": "2026-11-03T14:50:56+03:00",
        "date_finish": "2026-11-03T14:50:56+03:00",
        "operating_reset_at": 1793707200,
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
[`object`](../../../data-types.md) | Вид карточки [(подробное описание)](#layout) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект вида карточки {#layout}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор вида карточки: `C69:personal` и `C69:common` — личный и общий вид воронки, у лида и предложения — `personal` и `common`. Число в строке, например `"17"`, — дополнительный вид ||
|| **configuration**
[`object[]`](../../../data-types.md) | Разделы карточки в порядке вывода [(подробное описание)](#section) ||
|| **name**
[`string`](../../../data-types.md) | Название дополнительного вида. У личного и общего вида — `null` ||
|| **audience**
[`object[]`](../../../data-types.md) | Участники, которым доступен дополнительный вид [(подробное описание)](#audience). У личного и общего вида — `null` ||
|#

#### Раздел карточки {#section}

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Код раздела, например `main` ||
|| **title**
[`string`](../../../data-types.md) | Заголовок раздела в карточке ||
|| **elements**
[`object[]`](../../../data-types.md) | Поля раздела в порядке вывода. У каждого поля есть `name` — имя поля в карточке, например `TITLE`. Ключи `optionFlags` и `options` есть, только если они сохранены в виде: `optionFlags` равен `1`, если поле показывается всегда, и `0`, если только заполненным. В `options` — настройки поля, например `{"defaultCountry": "RU"}` ||
|#

#### Участник аудитории {#audience}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../../../data-types.md) | Тип участника: `user` — сотрудник, `department` — отдел с подотделами, `project` — группа или проект, `structure-node` — узел структуры компании ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор участника ||
|#

## Обработка ошибок

HTTP-статус: **404**

```json
{
    "error": {
        "code": "LAYOUT_NOT_FOUND",
        "message": "The form layout was not found."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

Ошибки видов карточки приходят с короткими кодами без префикса `BITRIX_REST_V3_`, например `LAYOUT_NOT_FOUND`, и с текстом на английском языке. HTTP-статус у таких ошибок разный, он указан рядом с кодом. Ошибки с кодами `BITRIX_REST_V3_*` приходят со статусом 400.

#### Вид карточки не найден

Код ошибки: `LAYOUT_NOT_FOUND`, HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | The form layout was not found. | Проверьте `id`: дополнительного вида нет, он в другой воронке или у пользователя нет к нему доступа. Список доступных видов возвращает метод [crm.<тип>.detailpagelayout.list](./crm-entity-detail-page-layout-list-rest-v3.md) ||
|#

#### Неверный идентификатор вида

Код ошибки: `INVALID_LAYOUT_ID`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Invalid form layout ID. | Проверьте формат `id` и воронку. Например, `C37:common` с `categoryId` другой воронки вызывает эту ошибку ||
|#

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `categoryId` | Обязательное поле `categoryId` не указано | Передайте `categoryId`. Для лида и предложения — `0` ||
|| `categoryId` | В поле `categoryId` требуется тип данных `int` для такого запроса | Передайте `categoryId` числом, а не строкой ||
|| `categoryId` | Значение поля должно быть не меньше, чем 0 | Передайте `0` или идентификатор воронки ||
|| `userId` | Значение поля должно быть не меньше, чем 1 | Передайте идентификатор существующего пользователя или не передавайте `userId` ||
|| `id` | Обязательное поле `id` не указано | Передайте идентификатор вида ||
|| `id` | В поле `id` требуется тип данных `string` для такого запроса | Передайте `id` строкой, например `"17"` ||
|#

#### Ошибка неизвестного параметра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `LayoutDto` | Уберите параметр из запроса. Метод принимает только `id`, `categoryId` и `userId` ||
|#

#### Неподдерживаемая воронка

Код ошибки: `UNSUPPORTED_CONTEXT`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | This form layout context is not supported. | Проверьте `categoryId`: у лида и предложения передавайте `0`, у остальных типов — идентификатор существующей воронки этого типа объекта ||
|#

#### Нет доступа

Код ошибки: `PERMISSION_DENIED`, HTTP-статус: **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Insufficient permissions to work with this form layout. | Чужой личный вид может получить только администратор CRM ||
|#

#### Ошибка хранилища

Код ошибки: `STORAGE_FAILED`, HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Could not complete the operation on the form layout. | Повторите запрос позже. Если ошибка повторяется, обратитесь в поддержку ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.detailpagelayout.get`. У моей компании методов видов карточки нет. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-detail-page-layout-add-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-update-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-list-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-delete-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-get-current-rest-v3.md)
