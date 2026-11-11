# Загрузить шаблон documentgenerator.template.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.add` добавляет шаблон документа из файла `.docx`.

{% note info "" %}

Метод создает шаблоны только модуля `rest`: в ответе `moduleId` всегда равен `rest`, а провайдер данных — `Bitrix\DocumentGenerator\DataProvider\Rest`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Набор полей шаблона [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название шаблона, от 1 до 100 символов ||
|| **file***
[`file`](../../data-types.md#standart-types) | Файл шаблона в формате `.docx`. Обязателен, если не передан `fileId`.

Файл можно передать тремя способами:
- [строкой Base64](../../files/how-to-upload-files.md#string) — имя файла в этом формате не передается
- [массивом](../../files/how-to-upload-files.md#array) `["имя_файла.docx","base64_контент"]`
- как файл `multipart/form-data` с именем поля `file`

Если передан `fileId`, параметр `file` не используется ||
|| **fileId**
[`integer`](../../data-types.md) | Идентификатор файла шаблона в генераторе документов. Используется вместо `file`, чтобы создать шаблон на основе файла уже существующего шаблона.

Получить идентификатор можно в поле `fileId` методом [documentgenerator.template.list](./document-generator-template-list.md). Идентификатор файла Диска не подходит: это другой идентификатор ||
|| **numeratorId***
[`integer`](../../data-types.md) | Идентификатор нумератора.

Получить идентификатор можно после [создания нумератора](../numerators/document-generator-numerator-add.md) или методом [получения списка нумераторов](../numerators/document-generator-numerator-list.md) ||
|| **region***
[`string`](../../data-types.md) | Код региона шаблона, например `ru`.

Получить список регионов можно методом [documentgenerator.region.list](../region/document-generator-region-list.md) ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **users**
[`array`](../../data-types.md) | Коды доступа пользователей, которым доступен шаблон.

Возможные значения:

- `U{id}` — пользователь
- `G{id}` — группа пользователей
- `AU` — все авторизованные пользователи
- `UA` — все пользователи
- `D{id}` — отдел
- `DR{id}` — отдел с подотделами
- `SG{id}` — рабочая группа или проект
- `SG{id}_A` — владелец рабочей группы или проекта
- `SG{id}_E` — модераторы рабочей группы или проекта
- `SG{id}_K` — все члены рабочей группы или проекта

Если параметр не передан или передан пустой массив, доступ получает текущий пользователь в формате `U{id}` ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен

По умолчанию `Y` ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печати и подписи. Возможные значения:
- `Y` — да
- `N` — нет

По умолчанию `N` ||
|| **sort**
[`integer`](../../data-types.md) | Индекс сортировки. По умолчанию `500` ||
|| **timezone**
[`string`](../../data-types.md) | Часовой пояс, в котором выводятся даты в документах по шаблону. Передается идентификатор часового пояса IANA, например `Europe/Moscow`.

Если поле не передано или передана пустая строка, даты выводятся в общем часовом поясе из настроек шаблонов документов, а если он не выбран — в часовом поясе сервера ||
|#

{% note tip "" %}

Как подготовить файл и выбрать формат передачи, читайте в статье [Как загрузить файлы](../../files/how-to-upload-files.md).

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"SUPPLY_CONTRACT Template","file":["supply_contract.docx","base64_encoded_content_here"],"numeratorId":1,"region":"ru","code":"REST_TEMPLATE","users":["UA"],"active":"Y","withStamps":"N","sort":500,"timezone":"Europe/Moscow"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.add
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"SUPPLY_CONTRACT Template","file":["supply_contract.docx","base64_encoded_content_here"],"numeratorId":1,"region":"ru","code":"REST_TEMPLATE","users":["UA"],"active":"Y","withStamps":"N","sort":500,"timezone":"Europe/Moscow"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.add
  ```

- JS (TS)

  ```ts
  // This snippet is an ES module: top-level await requires type="module" or a bundler.
  // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
  import { Text } from '@bitrix24/b24jssdk'
  import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

  declare const $b24: B24Frame

  // Shape of the payload returned in result (match the "response handling" section of the page)
  type TemplateAddResult = {
    template: {
      id: string
      name: string
      region: string
      code: string
      download: string
      downloadMachine: string
      active: 'Y' | 'N'
      moduleId: string
      numeratorId: string
      withStamps: 'Y' | 'N'
      providers: Record<string, string>
      users: Record<string, string>
      isDeleted: 'Y' | 'N'
      sort: string
      createTime: ISODate
      updateTime: ISODate
      timezone: string | null
    }
  }

  try {
    const response = await $b24.actions.v2.call.make<TemplateAddResult>({
      method: 'documentgenerator.template.add',
      params: {
        fields: {
          name: 'SUPPLY_CONTRACT Template',
          file: ['supply_contract.docx', 'base64_encoded_content_here'],
          numeratorId: 1,
          region: 'ru',
          code: 'REST_TEMPLATE',
          users: ['UA'],
          active: 'Y',
          withStamps: 'N',
          sort: 500,
          timezone: 'Europe/Moscow',
        },
      },
      requestId: Text.getUuidRfc4122()
    })

    // The payload is available only on a successful response
    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      const result = response.getData()!.result
      console.info('Added template:', result.template.id, result.template.name)
    }
  } catch (error) {
    // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
    console.error(error)
  }
  ```

- JS (UMD)

  ```html
  <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
  <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
  <script>
    async function addTemplate() {
      try {
        // Initialize the SDK inside a Bitrix24 frame
        const $b24 = await B24Js.initializeB24Frame()

        const response = await $b24.actions.v2.call.make({
          method: 'documentgenerator.template.add',
          params: {
            fields: {
              name: 'SUPPLY_CONTRACT Template',
              file: ['supply_contract.docx', 'base64_encoded_content_here'],
              numeratorId: 1,
              region: 'ru',
              code: 'REST_TEMPLATE',
              users: ['UA'],
              active: 'Y',
              withStamps: 'N',
              sort: 500,
              timezone: 'Europe/Moscow',
            },
          },
          requestId: B24Js.Text.getUuidRfc4122()
        })

        // The payload is available only on a successful response
        if (!response.isSuccess) {
          console.error(response.getErrorMessages().join('; '))
          return
        }

        const result = response.getData().result
        console.info('Added template:', result.template.id, result.template.name)
      } catch (error) {
        // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
        console.error(error)
      }
    }

    document.addEventListener('DOMContentLoaded', addTemplate)
  </script>
  ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  template_fields = {
      "name": "SUPPLY_CONTRACT Template",
      "file": [
          "supply_contract.docx",
          "base64_encoded_content_here",
      ],
      "numeratorId": 1,
      "region": "ru",
      "code": "REST_TEMPLATE",
      "users": [
          "UA",
      ],
      "active": "Y",
      "withStamps": "N",
      "sort": 500,
      "timezone": "Europe/Moscow",
  }

  try:
      bitrix_response = client.documentgenerator.template.add(
          fields=template_fields,
      ).response
      result = bitrix_response.result
      print(result)
  except BitrixAPIError as error:
      print(
          "Ошибка Bitrix API",
          f"error: {error.error}",
          f"error_description: {error.error_description}",
          sep="\n",
      )
  except BitrixSDKException as error:
      print(f"Ошибка Bitrix SDK: {error.message}")
  except Exception as error:
      print(f"Непредвиденная ошибка: {error}")
  ```

- PHP

  ```php
  try {
      $response = $b24Service->core->call(
          'documentgenerator.template.add',
          [
              'fields' => [
                  'name' => 'SUPPLY_CONTRACT Template',
                  'file' => ['supply_contract.docx', 'base64_encoded_content_here'],
                  'numeratorId' => 1,
                  'region' => 'ru',
                  'code' => 'REST_TEMPLATE',
                  'users' => ['UA'],
                  'active' => 'Y',
                  'withStamps' => 'N',
                  'sort' => 500,
                  'timezone' => 'Europe/Moscow',
              ],
          ]
      );

      $result = $response->getResponseData()->getResult();
      print_r($result);
  } catch (Throwable $e) {
      echo $e->getMessage();
  }
  ```

- BX24.js

  ```js
  BX24.callMethod(
      'documentgenerator.template.add',
      {
          fields: {
              name: 'SUPPLY_CONTRACT Template',
              file: ['supply_contract.docx', 'base64_encoded_content_here'],
              numeratorId: 1,
              region: 'ru',
              code: 'REST_TEMPLATE',
              users: ['UA'],
              active: 'Y',
              withStamps: 'N',
              sort: 500,
              timezone: 'Europe/Moscow'
          }
      },
      function(result)
      {
          if (result.error())
          {
              console.error(result.error());
          }
          else
          {
              console.log(result.data());
          }
      }
  );
  ```

- PHP CRest

  ```php
  require_once('crest.php');

  $result = CRest::call(
      'documentgenerator.template.add',
      [
          'fields' => [
              'name' => 'SUPPLY_CONTRACT Template',
              'file' => ['supply_contract.docx', 'base64_encoded_content_here'],
              'numeratorId' => 1,
              'region' => 'ru',
              'code' => 'REST_TEMPLATE',
              'users' => ['UA'],
              'active' => 'Y',
              'withStamps' => 'N',
              'sort' => 500,
              'timezone' => 'Europe/Moscow',
          ],
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.template.add", b24.Params{
    	"fields": b24.Params{
    		"name":        "SUPPLY_CONTRACT Template",
    		"file":        []string{"supply_contract.docx", "base64_encoded_content_here"},
    		"numeratorId": 1,
    		"region":      "ru",
    		"code":        "REST_TEMPLATE",
    		"users":       []string{"UA"},
    		"active":      "Y",
    		"withStamps":  "N",
    		"sort":        500,
    		"timezone":    "Europe/Moscow",
    	},
    })
    if err != nil {
    	return fmt.Errorf("documentgenerator.template.add: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "template".
    raw, ok := b24.Unwrap(res.Result, "template")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа template")
    }

    var item struct {
    	ID       b24.ID `json:"id"`
    	Name     string `json:"name"`
    	Region   string `json:"region"`
    	Code     string `json:"code"`
    	Download string `json:"download"`
    	Active   string `json:"active"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.Name)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "template": {
            "id": "385",
            "name": "SUPPLY_CONTRACT Template",
            "region": "ru",
            "code": "REST_TEMPLATE",
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=385&ts=1794393725",
            "active": "Y",
            "moduleId": "rest",
            "numeratorId": "1",
            "withStamps": "N",
            "providers": {
                "bitrix\\documentgenerator\\dataprovider\\rest": "bitrix\\documentgenerator\\dataprovider\\rest"
            },
            "users": {
                "UA": "UA"
            },
            "isDeleted": "N",
            "sort": "500",
            "createTime": "2026-11-11T13:42:03+03:00",
            "updateTime": "2026-11-11T13:42:03+03:00",
            "timezone": "Europe/Moscow",
            "downloadMachine": "https://mysite.ru/rest/1/xxxxxxxxxxxxxxxx/documentgenerator.api.template.download/?token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTM4NSZ0cz0xNzk0MzkzNzI1Jl89ZjI1VkdnOFlydkdPQUZVRnFpd05NRDBnN3JTTDIySjI%3D%7C...%3D"
        }
    },
    "time": {
        "start": 1794393723,
        "finish": 1794393725.630273,
        "duration": 2.6302731037139893,
        "processing": 2,
        "date_start": "2026-11-11T13:42:03+03:00",
        "date_finish": "2026-11-11T13:42:05+03:00",
        "operating_reset_at": 1794393960,
        "operating": 60.87245774269104
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **template**
[`object`](../../data-types.md) | Данные шаблона [(подробное описание)](#template) ||
|#

#### Объект template {#template}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../data-types.md) | Идентификатор шаблона ||
|| **name**
[`string`](../../data-types.md) | Название шаблона ||
|| **region**
[`string`](../../data-types.md) | Регион шаблона ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона в браузере пользователя, авторизованного в Битрикс24 ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона с токеном доступа. Подходит для скачивания из приложения или скрипта без сессии браузера ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **moduleId**
[`string`](../../data-types.md) | Идентификатор модуля шаблона. Для шаблонов, созданных этим методом, всегда `rest` ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора ||
|| **withStamps**
[`char`](../../data-types.md) | Использование печатей и подписей. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **providers**
[`object`](../../data-types.md) | Провайдеры данных шаблона.

Ключ и значение равны имени класса провайдера данных в нижнем регистре, например `bitrix\documentgenerator\dataprovider\rest` ||
|| **users**
[`object`](../../data-types.md) | Коды доступа к шаблону.

Ключ и значение равны коду доступа, например `UA` или `U1` ||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — удален
- `N` — не удален
||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время обновления ||
|| **timezone**
[`string`](../../data-types.md) | Часовой пояс шаблона в формате IANA, например `Europe/Moscow`.

Значение `null` — у шаблона нет своего часового пояса: даты выводятся в общем часовом поясе из настроек шаблонов документов, а если он не выбран — в часовом поясе сервера ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Empty required fields: numeratorId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {fields} | Не передан обязательный параметр `fields` ||
|| `400` | `100` | Invalid value {abc} to match with parameter {fields}. Should be value of type array. | Параметр `fields` передан не объектом. В фигурных скобках — переданное значение ||
|| `400` | `0` | Missing file content | Не передан ни `file`, ни `fileId` ||
|| `400` | `0` | Could not save file | Параметр `file` передан в неверном формате, например массив без содержимого файла ||
|| `400` | `0` | Empty required fields: name, numeratorId, region | Не переданы обязательные поля. В тексте ошибки перечислены только недостающие поля из `name`, `numeratorId`, `region` ||
|| `400` | `TIMEZONE_INVALID` | Timezone must be a canonical IANA identifier. | В поле `timezone` передан не идентификатор часового пояса IANA, например смещение `+03:00` ||
|| `400` | `BX_INVALID_VALUE` | Для значения поля "NAME" превышена максимальная длина: 100. | Значение `name` длиннее 100 символов ||
|| `400` | `BX_INVALID_VALUE` | Неправильное значение для "ACTIVE" | В `active` передано значение, отличное от `Y` и `N` ||
|| `400` | `BX_INVALID_VALUE` | Неправильное значение для "WITH_STAMPS" | В `withStamps` передано значение, отличное от `Y` и `N` ||
|| `400` | `0` | You do not have permissions to modify templates | У пользователя нет права на изменение шаблонов генератора документов ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-get.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
