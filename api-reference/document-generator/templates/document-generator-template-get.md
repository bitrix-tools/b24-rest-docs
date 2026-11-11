# Получить шаблон по идентификатору documentgenerator.template.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

Метод `documentgenerator.template.get` возвращает информацию о шаблоне по его идентификатору.

{% note info "" %}

Метод работает только с шаблонами, загруженными через REST API, — у них `moduleId` равен `rest`. Для шаблонов CRM и других модулей метод вернет ошибку `DOCGEN_ACCESS_ERROR`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор шаблона.

Получить идентификатор шаблона можно после [создания шаблона](./document-generator-template-add.md) или методом [получения списка шаблонов](./document-generator-template-list.md).

Метод возвращает и шаблоны, помеченные как удаленные: у них поле `isDeleted` равно `Y` ||
|#

{% note info "" %}

Вместо `id` можно передать параметр `templateId` с тем же значением. Если не передан ни один из них, метод вернет ошибку с кодом `100`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.template.get
  ```

- cURL (OAuth)

  ```bash
  curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/documentgenerator.template.get
  ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type TemplateGetResult = {
      template: {
        id: string
        name: string
        region: string
        code: string
        download: string
        active: string
        moduleId: string
        numeratorId: string
        withStamps: string
        providers: Record<string, string>
        users: Record<string, string>
        isDeleted: string
        sort: string
        createTime: ISODate | null
        updateTime: ISODate | null
        timezone: string | null
        downloadMachine: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<TemplateGetResult>({
        method: 'documentgenerator.template.get',
        params: {
          id: 325,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.template.id, result.template.name, result.template.active)
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
      async function getTemplate() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'documentgenerator.template.get',
            params: {
              id: 325,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.template.id, result.template.name, result.template.active)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplate)
    </script>
    ```

- Python

  ```python
  from b24pysdk.errors import BitrixAPIError, BitrixSDKException

  try:
      bitrix_response = client.documentgenerator.template.get(
          bitrix_id=325,
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
          'documentgenerator.template.get',
          [
              'id' => 325,
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
      'documentgenerator.template.get',
      {
          id: 325
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
      'documentgenerator.template.get',
      [
          'id' => 325,
      ]
  );

  print_r($result);
  ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "documentgenerator.template.get", b24.Params{
    	"id": 325,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("documentgenerator.template.get: %w", err)
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
            "id": "325",
            "name": "Supply contract",
            "region": "ru",
            "code": "TEST_DG_GET",
            "download": "https://mysite.ru/bitrix/services/main/ajax.php?action=documentgenerator.api.template.download&SITE_ID=s1&id=325&ts=1794393617",
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
            "createTime": "2026-11-11T13:38:10+03:00",
            "updateTime": "2026-11-11T13:40:17+03:00",
            "timezone": null,
            "downloadMachine": "https://mysite.ru/rest/1/xxxxxxxxxxxxxxxx/documentgenerator.api.template.download/?token=documentgenerator%7CYWN0aW9uPWRvY3VtZW50Z2VuZXJhdG9yLmFwaS50ZW1wbGF0ZS5kb3dubG9hZCZTSVRFX0lEPXMxJmlkPTMyNSZ0cz0xNzk0MzkzNjE3Jl89S01PNnhjOHFVakZ1QmpjUlI3dXFvS1B4ZmNrME1nZHA%3D%7C..."
        }
    },
    "time": {
        "start": 1794393619,
        "finish": 1794393619.555549,
        "duration": 0.555548906326294,
        "processing": 0,
        "date_start": "2026-11-11T13:40:19+03:00",
        "date_finish": "2026-11-11T13:40:19+03:00",
        "operating_reset_at": 1794394200,
        "operating": 0
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
[`string`](../../data-types.md) | Регион шаблона, например `ru`. Список регионов возвращает метод [documentgenerator.region.list](../region/document-generator-region-list.md) ||
|| **code**
[`string`](../../data-types.md) | Символьный код шаблона ||
|| **download**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона в браузере под авторизацией пользователя Битрикс24 ||
|| **downloadMachine**
[`string`](../../data-types.md) | Ссылка на скачивание файла шаблона через REST API. Содержит адрес вебхука или авторизацию приложения и подписанный токен `token` ||
|| **active**
[`char`](../../data-types.md) | Активность шаблона. Возможные значения:
- `Y` — активен
- `N` — не активен
||
|| **moduleId**
[`string`](../../data-types.md) | Код модуля, к которому привязан шаблон. Для шаблонов, загруженных через REST API, всегда `rest` ||
|| **numeratorId**
[`string`](../../data-types.md) | Идентификатор нумератора. Данные нумератора возвращает метод [documentgenerator.numerator.get](../numerators/document-generator-numerator-get.md) ||
|| **withStamps**
[`char`](../../data-types.md) | Подставлять печати и подписи. Возможные значения:
- `Y` — да
- `N` — нет
||
|| **providers**
[`object`](../../data-types.md) | Провайдеры данных шаблона. Ключ и значение равны имени класса провайдера в нижнем регистре.

Для шаблонов, загруженных через REST API, объект содержит один провайдер `bitrix\documentgenerator\dataprovider\rest` ||
|| **users**
[`object`](../../data-types.md) | Коды доступа к шаблону. Ключ и значение равны коду доступа.

Возможные коды:
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
||
|| **isDeleted**
[`char`](../../data-types.md) | Признак удаления шаблона. Возможные значения:
- `Y` — удален. Шаблон помечается удаленным, если при вызове [documentgenerator.template.delete](./document-generator-template-delete.md) по нему уже были созданы документы. Файл такого шаблона отвязан, получить его поля методом [documentgenerator.template.getfields](./document-generator-template-get-fields.md) нельзя
- `N` — не удален
||
|| **sort**
[`string`](../../data-types.md) | Индекс сортировки ||
|| **createTime**
[`datetime`](../../data-types.md) | Дата и время создания шаблона ||
|| **updateTime**
[`datetime`](../../data-types.md) | Дата и время последнего обновления шаблона ||
|| **timezone**
[`string`](../../data-types.md) | Часовой пояс шаблона в формате IANA, например `Europe/Moscow`.

Значение `null` — у шаблона нет своего часового пояса: даты выводятся в общем часовом поясе из настроек шаблонов документов, а если он не выбран — в часовом поясе сервера ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "0",
    "error_description": "Шаблон не найден"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `id` или `templateId` ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `id` не существует или в `id` передано не положительное целое число, например `0` или `"abc"` ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Шаблон относится не к модулю `rest`, например это шаблон CRM ||
|| `400` | `0` | You do not have permissions to modify templates | У пользователя нет права на изменение шаблонов генератора документов ||
|| `400` | `0` | You do not have permissions to modify this template | У пользователя нет права на изменение этого шаблона ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./document-generator-template-add.md)
- [{#T}](./document-generator-template-update.md)
- [{#T}](./document-generator-template-list.md)
- [{#T}](./document-generator-template-delete.md)
- [{#T}](./document-generator-template-get-fields.md)
