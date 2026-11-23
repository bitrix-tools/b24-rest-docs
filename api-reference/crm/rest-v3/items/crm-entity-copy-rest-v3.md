# Скопировать элемент CRM v 3.0 crm.<тип>.copy

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр исходного элемента и на добавление элементов этого типа объекта CRM. Для моей компании — администратор CRM

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.copy` создает копию элемента CRM и возвращает идентификатор копии. Тип объекта задает сегмент `<тип>` в имени метода.

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** | **Поля** ||
|| Сделка | `crm.deal.copy` | [Поля сделки](./fields-deal.md) ||
|| Лид | `crm.lead.copy` | [Поля лида](./fields-lead.md) ||
|| Контакт | `crm.contact.copy` | [Поля контакта](./fields-contact.md) ||
|| Компания | `crm.company.copy` | [Поля компании](./fields-company.md) ||
|| Предложение | `crm.quote.copy` | [Поля предложения](./fields-quote.md) ||
|| Счет | `crm.smartinvoice.copy` | [Поля счета](./fields-smart-invoice.md) ||
|| Моя компания | `crm.mycompany.copy` | [Поля моей компании](./fields-my-company.md) ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.copy`, например `crm.smartprocess1038.copy` | [Поля смарт-процесса](./fields-smart-process.md) ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.copy`, а не `crm.smartInvoice.copy` или `crm.smart_invoice.copy`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор элемента, который нужно скопировать.

Идентификатор можно получить методом [crm.<тип>.list](./crm-entity-list-rest-v3.md) ||
|| **fields**
[`object`](../../../data-types.md) | Объект с полями, значения которых в копии должны отличаться от исходного элемента, в формате `{"поле": "значение"}`. [Описание параметра](#fields).

По умолчанию: копия получает значения исходного элемента ||
|#

Других параметров метод не принимает: на лишний ключ в теле запроса он отвечает ошибкой валидации.

### Что копируется

Копия получает значения полей исходного элемента, в том числе стадию, сумму, комментарий, множественные поля `phone`, `email`, `web`, `im` и товарные позиции. Название не меняется: у копии то же `title`, что у исходного элемента.

Не копируются:

- поля, которые Битрикс24 заполняет сам: `id`, `createdTime`, `createdById`, `updatedTime`, `updatedById`. Создателем копии становится пользователь, который вызвал метод
- дела исходного элемента

Файлы в полях `photo`, `logo` и пользовательских полях типа «Файл» копия получает как новые файлы.

### Параметр fields {#fields}

Передавайте в `fields` только поля, которые нужно изменить. Формат значений и правила проверки — те же, что у метода [crm.<тип>.update](./crm-entity-update-rest-v3.md):

- имена полей пишутся в camelCase: `title`, `assignedById`, `stageId`
- поля только для чтения, например `id` или `contactId`, вызывают ошибку
- `stageId` должен быть стадией из воронки копии, `categoryId` — существующей воронкой этого типа объекта
- если передать только `categoryId`, копия попадает на первую стадию новой воронки

Состав полей каждого типа объекта описан на странице полей типа, ссылки — в таблице выше. Пустой объект `fields` равен вызову без `fields`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.smartprocess1038.copy`

{% endnote %}

Примеры копируют элемент смарт-процесса с идентификатором типа `1038` и задают копии новое название и сумму. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41,"fields":{"title":"Копия заявки на закупку","opportunity":3000}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.smartprocess1038.copy
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":41,"fields":{"title":"Копия заявки на закупку","opportunity":3000},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.smartprocess1038.copy
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CopyResult = {
      id: number
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CopyResult>(
        'crm.smartprocess1038.copy',
        {
          id: 41,
          fields: {
            title: 'Копия заявки на закупку',
            opportunity: 3000,
          },
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Copy ID:', result.id)
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
      async function copyItem() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.smartprocess1038.copy',
            {
              id: 41,
              fields: {
                title: 'Копия заявки на закупку',
                opportunity: 3000,
              },
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Copy ID:', result.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', copyItem)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.smartprocess1038.copy"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 41,
                "fields": {
                    "title": "Копия заявки на закупку",
                    "opportunity": 3000,
                },
            },
            prefer_version=3,
        )
        result = response["result"]
        print(result["id"])
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
                'crm.smartprocess1038.copy',
                [
                    'id' => 41,
                    'fields' => [
                        'title' => 'Копия заявки на закупку',
                        'opportunity' => 3000,
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
        'crm.smartprocess1038.copy',
        {
            id: 41,
            fields: {
                title: 'Копия заявки на закупку',
                opportunity: 3000,
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
        'crm.smartprocess1038.copy',
        [
            'id' => 41,
            'fields' => [
                'title' => 'Копия заявки на закупку',
                'opportunity' => 3000,
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
    res, err := client.Core().Call(ctx, "crm.smartprocess1038.copy", b24.Params{
    	"id": 41,
    	"fields": b24.Params{
    		"title":       "Копия заявки на закупку",
    		"opportunity": 3000,
    	},
    })
    if err != nil {
    	return fmt.Errorf("crm.smartprocess1038.copy: %w", err)
    }

    var created struct {
    	ID int `json:"id"`
    }
    if err := json.Unmarshal(res.Result, &created); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(created.ID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "id": 65
    },
    "time": {
        "start": 1795431045,
        "finish": 1795431045.31671,
        "duration": 0.3167099952697754,
        "processing": 0,
        "date_start": "2026-11-23T13:50:45+03:00",
        "date_finish": "2026-11-23T13:50:45+03:00",
        "operating_reset_at": 1795431600,
        "operating": 0.349790096282959
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Объект с данными ответа ||
|| **result.id**
[`integer`](../../../data-types.md) | Идентификатор копии. Поля копии можно получить методом [crm.<тип>.get](./crm-entity-get-rest-v3.md) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION",
        "message": "Ошибка при валидации объекта",
        "validation": [
            {
                "message": "Поле \"id\" не доступно к заполнению",
                "field": "id"
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
|| `id` | Обязательное поле `id` не указано | Передайте `id` исходного элемента ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор числом ||
|| `id` | Значение поля должно быть не меньше, чем 1 | Передайте положительный идентификатор ||
|| `fields` | В поле `fields` требуется тип данных `object` для такого запроса | Передайте `fields` объектом `{"поле": "значение"}`, а не строкой или массивом ||
|| `foo` | Ошибка при валидации объекта запроса | В тело запроса передан лишний ключ, в `field` — его имя. Оставьте только `id` и `fields` ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Поле "id" не доступно к заполнению | Уберите `id` из `fields`: идентификатор копии назначается автоматически ||
|| `contactId` | Поле "contactId" не доступно к заполнению | Уберите поле только для чтения из `fields`. Контакты передавайте в `contactsId` ||
|| `stageId` | Значение поля не содержится в списке допустимых значений: NEW, PREPARATION, PREPAYMENT_INVOICE, EXECUTING, FINAL_INVOICE, WON, LOSE, APOLOGY | Передайте стадию из воронки копии. В тексте ошибки перечислены допустимые стадии ||
|| `categoryId` | Значение поля не содержится в списке допустимых значений | Передайте идентификатор существующей воронки этого типа объекта ||
|| `assignedById` | Значение поля не содержится в списке допустимых значений | Передайте идентификатор существующего пользователя ||
|#

#### Элемент не найден

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `999999999` не найдена | Исходного элемента нет у этого типа объекта или у вас нет права на его просмотр. Проверьте `id` и имя метода: `crm.company.copy` не находит мои компании, а `crm.mycompany.copy` — компании клиентов ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `foo` для сущности `EntityTypeSmartProcess1038Dto` | Проверьте имя поля в `fields` по странице полей типа объекта. Имена полей пишутся в camelCase: `title`, а не `TITLE` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | У вас нет прав на добавление нового элемента сущности #ENTITY_DESCRIPTION# | У вас нет права на добавление элементов этого типа объекта. Попросите администратора CRM выдать право ||
|| `-` | Доступ запрещен | Для `crm.lead.copy`: лиды выключены на Битрикс24. Для `crm.mycompany.copy`: вы не администратор CRM ||
|#

#### Копия создана не полностью

Код ошибки: `CRM_COPY_INCOMPLETE`, HTTP-статус **500**

```json
{
    "error": {
        "code": "CRM_COPY_INCOMPLETE",
        "message": "Общая ошибка",
        "persistence": "created",
        "id": 65
    }
}
```

Ошибка возникла после того, как копия могла быть записана. В ответе есть дополнительные ключи:

- `persistence` — состояние копии: `created` — копия создана, `unknown` — неизвестно, создана ли копия
- `id` — идентификатор копии, если он известен

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Общая ошибка | Не повторяйте вызов сразу: так появится вторая копия. Если в ответе есть `id`, проверьте копию методом [crm.<тип>.get](./crm-entity-get-rest-v3.md). Если `id` нет, найдите копию методом [crm.<тип>.list](./crm-entity-list-rest-v3.md), например по `title` и `createdTime` ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smart_invoice.copy` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.copy`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md). У документов CRM и документов КЭДО метода копирования нет ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-add-rest-v3.md)
- [{#T}](./crm-entity-update-rest-v3.md)
- [{#T}](./crm-entity-get-rest-v3.md)
- [{#T}](./crm-entity-list-rest-v3.md)
