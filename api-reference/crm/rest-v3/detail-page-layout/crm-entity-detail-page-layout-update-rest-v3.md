# Изменить вид карточки v 3.0 crm.<тип>.detailpagelayout.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь — свой личный вид; общий и дополнительные виды — пользователь с правом изменять общий вид карточки этого типа объекта, например администратор CRM; личный вид другого пользователя — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.detailpagelayout.update` изменяет личный, общий или дополнительный вид карточки элемента CRM. Тип объекта задает сегмент `<тип>` в имени метода.

У личного и общего вида меняется только набор разделов и полей `configuration`. У дополнительного вида можно изменить также название `name` и аудиторию `audience`. Метод меняет только переданные ключи `fields`, а каждый переданный ключ заменяет значение целиком: новый массив `configuration` заменяет все разделы, новый массив `audience` — всех участников.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.detailpagelayout.update` ||
|| Лид | `crm.lead.detailpagelayout.update` ||
|| Контакт | `crm.contact.detailpagelayout.update` ||
|| Компания | `crm.company.detailpagelayout.update` ||
|| Предложение | `crm.quote.detailpagelayout.update` ||
|| Счет | `crm.smartinvoice.detailpagelayout.update` ||
|| Документ CRM | `crm.smartdocument.detailpagelayout.update` ||
|| Документ КЭДО | `crm.smartb2edocument.detailpagelayout.update` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.detailpagelayout.update`, например `crm.smartprocess1038.detailpagelayout.update` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Методы видов карточки есть у смарт-процесса при любых настройках типа. У моей компании этих методов нет.

Имя метода пишется в нижнем регистре: `crm.deal.detailpagelayout.update`, а не `crm.deal.detailPageLayout.update`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

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
[`integer`](../../../data-types.md) | Идентификатор пользователя, чей вид изменить. Нужен, чтобы изменить личный вид другого пользователя. Передавать идентификатор другого пользователя может только администратор CRM.

По умолчанию — пользователь, который вызывает метод.

Идентификаторы пользователей можно получить методом [user.get](../../../user/user-get.md) ||
|| **fields***
[`object`](../../../data-types.md) | Новые значения вида [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

Передайте хотя бы один ключ.

#|
|| **Название**
`тип` | **Описание** ||
|| **configuration**
[`object[]`](../../../data-types.md) | Разделы карточки в порядке вывода [(подробное описание)](#configuration). Массив заменяет все разделы вида, поэтому передавайте конфигурацию целиком. Текущую конфигурацию возвращает метод [crm.<тип>.detailpagelayout.get](./crm-entity-detail-page-layout-get-rest-v3.md) ||
|| **name**
[`string`](../../../data-types.md) | Новое название дополнительного вида, до 100 символов. У личного и общего вида названия нет ||
|| **audience**
[`object[]`](../../../data-types.md) | Новый список участников дополнительного вида, хотя бы один [(подробное описание)](#audience). Список заменяет прежний целиком. Пользователь, который вызывает метод, в аудиторию сам не попадает. У личного и общего вида аудитории нет ||
|#

### Параметр configuration {#configuration}

Массив разделов карточки в порядке вывода. Каждый раздел — объект:

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Код раздела, уникальный в пределах вида, например `main` ||
|| **title***
[`string`](../../../data-types.md) | Заголовок раздела в карточке ||
|| **elements***
[`object[]`](../../../data-types.md) | Поля раздела в порядке вывода [(подробное описание)](#elements). Можно передать пустой массив ||
|#

#### Поле раздела {#elements}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../../data-types.md) | Имя поля в карточке: `TITLE`, `STAGE_ID`, `OPPORTUNITY_WITH_CURRENCY`, пользовательское поле `UF_CRM_1687529546`. Имена пишутся в верхнем регистре и не совпадают с именами полей элемента в REST 3.0 ||
|| **optionFlags**
[`integer`](../../../data-types.md) | Показывать ли поле, когда оно не заполнено.

Возможные значения:

- `1` — показывать всегда
- `0` — показывать, только если поле заполнено ||
|| **options**
[`object`](../../../data-types.md) | Настройки поля в формате `{"настройка": "значение"}`, например `{"defaultCountry": "RU"}` для телефона. Набор настроек зависит от поля. Настройки полей есть в конфигурации вида, которую возвращает метод [crm.<тип>.detailpagelayout.get](./crm-entity-detail-page-layout-get-rest-v3.md) ||
|#

Метод не проверяет, есть ли поле с таким именем у типа объекта: вид с неизвестным именем поля сохранится. Готовые имена полей и их настройки возьмите из конфигурации общего вида — ее возвращает метод [crm.<тип>.detailpagelayout.get](./crm-entity-detail-page-layout-get-rest-v3.md) с идентификатором из [crm.<тип>.detailpagelayout.getcommonlayoutid](./crm-entity-detail-page-layout-get-common-layout-id-rest-v3.md).

### Параметр audience {#audience}

Массив участников, которым доступен дополнительный вид. Участник — объект:

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../../data-types.md) | Тип участника.

Возможные значения:

- `user` — сотрудник. Идентификатор можно получить методом [user.get](../../../user/user-get.md)
- `department` — отдел вместе с подотделами. Идентификатор можно получить методом [department.get](../../../departments/department-get.md)
- `project` — группа или проект. Идентификатор можно получить методом [sonet_group.get](../../../sonet-group/sonet-group-get.md)
- `structure-node` — узел структуры компании вместе с дочерними узлами ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор участника, положительное число ||
|#

В аудитории может быть до 1000 участников.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.detailpagelayout.update`

{% endnote %}

Примеры меняют название и аудиторию дополнительного вида `17` смарт-процесса с идентификатором типа `1038`: вид становится доступен отделу `47` и сотруднику `29`. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":0,"id":"17","fields":{"name":"Карточка для закупок и склада","audience":[{"type":"department","id":47},{"type":"user","id":29}]}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.detailpagelayout.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"categoryId":0,"id":"17","fields":{"name":"Карточка для закупок и склада","audience":[{"type":"department","id":47},{"type":"user","id":29}]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.detailpagelayout.update
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type LayoutChangeResult = {
      result: boolean
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<LayoutChangeResult>(
        'crm.smartprocess1038.detailpagelayout.update',
        {
          categoryId: 0,
          id: '17',
          fields: {
            name: 'Карточка для закупок и склада',
            audience: [
              { type: 'department', id: 47 },
              { type: 'user', id: 29 },
            ],
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Layout updated:', result.result)
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
      async function updateLayout() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.detailpagelayout.update',
            {
              categoryId: 0,
              id: '17',
              fields: {
                name: 'Карточка для закупок и склада',
                audience: [
                  { type: 'department', id: 47 },
                  { type: 'user', id: 29 },
                ],
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Layout updated:', result.result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateLayout)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.detailpagelayout.update"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "categoryId": 0,
                "id": "17",
                "fields": {
                    "name": "Карточка для закупок и склада",
                    "audience": [
                        {"type": "department", "id": 47},
                        {"type": "user", "id": 29},
                    ],
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["result"])
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
                'crm.smartprocess1038.detailpagelayout.update',
                [
                    'categoryId' => 0,
                    'id' => '17',
                    'fields' => [
                        'name' => 'Карточка для закупок и склада',
                        'audience' => [
                            ['type' => 'department', 'id' => 47],
                            ['type' => 'user', 'id' => 29],
                        ],
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
        'crm.smartprocess1038.detailpagelayout.update',
        {
            categoryId: 0,
            id: '17',
            fields: {
                name: 'Карточка для закупок и склада',
                audience: [
                    { type: 'department', id: 47 },
                    { type: 'user', id: 29 },
                ],
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
        'crm.smartprocess1038.detailpagelayout.update',
        [
            'categoryId' => 0,
            'id' => '17',
            'fields' => [
                'name' => 'Карточка для закупок и склада',
                'audience' => [
                    ['type' => 'department', 'id' => 47],
                    ['type' => 'user', 'id' => 29],
                ],
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.detailpagelayout.update", b24.Params{
    	"categoryId": 0,
    	"id":         "17",
    	"fields": b24.Params{
    		"name": "Карточка для закупок и склада",
    		"audience": []b24.Params{
    			{"type": "department", "id": 47},
    			{"type": "user", "id": 29},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.detailpagelayout.update: %w", err)
    }

    var answer struct {
    	Result bool `json:"result"`
    }
    if err := json.Unmarshal(res.Result, &answer); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(answer.Result)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "result": true
    },
    "time": {
        "start": 1793706651,
        "finish": 1793706651.905107,
        "duration": 0.9051070213317871,
        "processing": 0,
        "date_start": "2026-11-03T14:50:51+03:00",
        "date_finish": "2026-11-03T14:50:51+03:00",
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
|| **result.result**
[`boolean`](../../../data-types.md) | `true`, если вид изменен ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "INVALID_LAYOUT_AUDIENCE",
        "message": "Invalid form layout audience."
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

Ошибки видов карточки приходят с короткими кодами без префикса `BITRIX_REST_V3_`, например `LAYOUT_NOT_FOUND`, и с текстом на английском языке. HTTP-статус у таких ошибок разный, он указан рядом с кодом. Ошибки с кодами `BITRIX_REST_V3_*` приходят со статусом 400.

#### Неверная конфигурация вида

Код ошибки: `INVALID_LAYOUT_CONFIGURATION`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Invalid form layout configuration. | Не передавайте `name` для личного и общего вида. Проверьте, что `name` не длиннее 100 символов, а `configuration` — не пустой массив ||
|#

#### Неверная аудитория вида

Код ошибки: `INVALID_LAYOUT_AUDIENCE`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Invalid form layout audience. | Не передавайте `audience` для личного и общего вида. Проверьте, что `audience` — не пустой массив и в нем не больше 1000 участников ||
|#

#### Неверный идентификатор вида

Код ошибки: `INVALID_LAYOUT_ID`, HTTP-статус: **400**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Invalid form layout ID. | Проверьте формат `id` и воронку: идентификатор вида должен относиться к воронке из `categoryId` ||
|#

#### Вид карточки не найден

Код ошибки: `LAYOUT_NOT_FOUND`, HTTP-статус: **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | The form layout was not found. | Проверьте `id`: дополнительного вида нет, он в другой воронке или у пользователя нет к нему доступа ||
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
|| `fields` | Обязательное поле `fields` не указано | Передайте в `fields` хотя бы один ключ. Ошибка приходит и на пустой объект `fields` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `audience.0.type` | Значение поля не содержится в списке допустимых значений: user, department, project, structure-node | Передайте один из типов участника из описания параметра ||
|| `configuration.0.elements` | Не заполнено обязательное поле "elements" | Передайте в каждом разделе `name`, `title` и `elements` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `LayoutFieldsDto` | Уберите лишний ключ. Запрос принимает `id`, `categoryId`, `userId` и `fields` ||
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
|| `-` | Insufficient permissions to work with this form layout. | Общий и дополнительные виды изменяет пользователь с правом изменять общий вид карточки, личный вид другого пользователя — администратор CRM ||
|#

#### Ошибка сохранения

Код ошибки: `STORAGE_FAILED`, HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Could not complete the operation on the form layout. | Повторите запрос позже. Если ошибка повторяется, обратитесь в поддержку ||
|#

#### Изменения применены частично

Код ошибки: `CONSISTENCY_FAILURE`, HTTP-статус: **500**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Form layout changes were partially applied. | Часть изменений сохранилась. Прочитайте вид методом [crm.<тип>.detailpagelayout.get](./crm-entity-detail-page-layout-get-rest-v3.md) и повторите изменение ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `#METHOD#` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.deal.detailpagelayout.update`. У моей компании методов видов карточки нет. Для смарт-процесса проверьте `entityTypeId` методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-detail-page-layout-add-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-get-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-list-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-delete-rest-v3.md)
- [{#T}](./crm-entity-detail-page-layout-get-current-rest-v3.md)
