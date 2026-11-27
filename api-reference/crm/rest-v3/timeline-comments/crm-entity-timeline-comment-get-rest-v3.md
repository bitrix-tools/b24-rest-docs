# Получить комментарий таймлайна v 3.0 crm.<тип>.timeline.comment.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на просмотр элемента CRM, к которому привязан комментарий, для моей компании — с правом на просмотр моих компаний

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Метод `crm.<тип>.timeline.comment.get` возвращает комментарий таймлайна по идентификатору. Тип объекта задает сегмент `<тип>` в имени метода: метод находит комментарий, только если он привязан к элементу этого типа. Комментарий сделки метод `crm.lead.timeline.comment.get` не найдет.

{% note warning "" %}

Без параметра `select` метод возвращает только идентификатор комментария: `{"item":{"id":77161}}`. Чтобы получить текст, автора и дату, перечислите поля в `select`.

{% endnote %}

## Имя метода для типа объекта

#|
|| **Тип объекта** | **Метод** ||
|| Сделка | `crm.deal.timeline.comment.get` ||
|| Лид | `crm.lead.timeline.comment.get` ||
|| Контакт | `crm.contact.timeline.comment.get` ||
|| Компания | `crm.company.timeline.comment.get` ||
|| Моя компания | `crm.mycompany.timeline.comment.get` ||
|| Предложение | `crm.quote.timeline.comment.get` ||
|| Счет | `crm.smartinvoice.timeline.comment.get` ||
|| Документ CRM | `crm.smartdocument.timeline.comment.get` ||
|| Документ КЭДО | `crm.smartb2edocument.timeline.comment.get` ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.timeline.comment.get`, например `crm.smartprocess1038.timeline.comment.get` ||
|#

Для смарт-процесса в имя метода подставляется идентификатор его типа `entityTypeId`. Идентификаторы типов смарт-процессов `entityTypeId` возвращает метод [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md).

Имя метода пишется в нижнем регистре: `crm.smartinvoice.timeline.comment.get`, а не `crm.smartInvoice.timeline.comment.get`. На имя в другом регистре метод отвечает ошибкой [«Метод не найден»](#method-not-found).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор комментария.

Идентификатор возвращают методы [crm.<тип>.timeline.comment.add](./crm-entity-timeline-comment-add-rest-v3.md) и [crm.<тип>.timeline.comment.list](./crm-entity-timeline-comment-list-rest-v3.md) ||
|| **select**
[`array`](../../../data-types.md) | Список полей комментария, которые нужно вернуть, например `["id","text","authorId","createdTime"]`. [Поля комментария](#item).

По умолчанию: только `id` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/crm.deal.timeline.comment.get`

{% endnote %}

Примеры получают комментарий сделки. Для другого типа объекта замените имя метода по таблице выше.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":77161,"select":["id","ownerTypeId","ownerId","text","authorId","createdTime"]}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.timeline.comment.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":77161,"select":["id","ownerTypeId","ownerId","text","authorId","createdTime"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/crm.deal.timeline.comment.get
    ```

- JS (TS)

    Методы CRM пока не входят в список методов REST 3.0, который знает `$b24.actions.v3.call.make`: такой вызов вернет ошибку SDK `JSSDK_CORE_METHOD_NOT_SUPPORT_IN_API_V3`. Вызывайте метод через HTTP-клиент REST 3.0 — `$b24.getHttpClient(ApiVersion.v3).call`.

    ```ts
    import { ApiVersion, Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type CommentGetResult = {
      item: {
        id: number
        ownerTypeId: number
        ownerId: number
        text: string
        authorId: number | null
        createdTime: string
      }
    }

    try {
      const response = await $b24.getHttpClient(ApiVersion.v3).call<CommentGetResult>(
        'crm.deal.timeline.comment.get',
        {
          id: 77161,
          select: ['id', 'ownerTypeId', 'ownerId', 'text', 'authorId', 'createdTime'],
        },
        Text.getUuidRfc4122()
      )

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Comment:', result.item.text)
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
      async function getComment() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.getHttpClient(B24Js.ApiVersion.v3).call(
            'crm.deal.timeline.comment.get',
            {
              id: 77161,
              select: ['id', 'ownerTypeId', 'ownerId', 'text', 'authorId', 'createdTime'],
            },
            B24Js.Text.getUuidRfc4122()
          )

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Comment:', result.item.text)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getComment)
    </script>
    ```

- Python

    У методов CRM нет готовых оберток в `b24pysdk`, и SDK отправляет в REST 3.0 только методы из списка `Config().api_v3_methods`. Добавьте метод в этот список и вызовите его через `bitrix_token.call_method` с `prefer_version=3`.

    ```python
    from b24pysdk import Config
    from b24pysdk.errors import BitrixSDKException
    from b24pysdk.errors.v3 import BitrixAPIError

    method = "crm.deal.timeline.comment.get"
    Config().configure(api_v3_methods=Config().api_v3_methods | {method})

    try:
        response = bitrix_token.call_method(
            api_method=method,
            params={
                "id": 77161,
                "select": ["id", "ownerTypeId", "ownerId", "text", "authorId", "createdTime"],
            },
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
                'crm.deal.timeline.comment.get',
                [
                    'id' => 77161,
                    'select' => ['id', 'ownerTypeId', 'ownerId', 'text', 'authorId', 'createdTime'],
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
        'crm.deal.timeline.comment.get',
        {
            id: 77161,
            select: ['id', 'ownerTypeId', 'ownerId', 'text', 'authorId', 'createdTime'],
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
        'crm.deal.timeline.comment.get',
        [
            'id' => 77161,
            'select' => ['id', 'ownerTypeId', 'ownerId', 'text', 'authorId', 'createdTime'],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.deal.timeline.comment.get", b24.Params{
    	"id":     77161,
    	"select": []string{"id", "ownerTypeId", "ownerId", "text", "authorId", "createdTime"},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.deal.timeline.comment.get: %w", err)
    }

    var result struct {
    	Item struct {
    		ID          int    `json:"id"`
    		OwnerTypeID int    `json:"ownerTypeId"`
    		OwnerID     int    `json:"ownerId"`
    		Text        string `json:"text"`
    		AuthorID    *int   `json:"authorId"`
    		CreatedTime string `json:"createdTime"`
    	} `json:"item"`
    }
    if err := json.Unmarshal(res.Result, &result); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(result.Item.ID, result.Item.Text)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 77161,
            "ownerTypeId": 2,
            "ownerId": 741,
            "text": "Отправили коммерческое предложение, ждем ответа до 1 декабря",
            "authorId": 1,
            "createdTime": "2026-11-27T12:40:05+03:00"
        }
    },
    "time": {
        "start": 1795772416,
        "finish": 1795772417.01424,
        "duration": 1.014240026473999,
        "processing": 1,
        "date_start": "2026-11-27T12:40:16+03:00",
        "date_finish": "2026-11-27T12:40:17+03:00",
        "operating_reset_at": 1795773000,
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
[`object`](../../../data-types.md) | Комментарий с полями из `select`, без `select` — только с `id`. [Поля комментария](#item) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Поля комментария {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор комментария ||
|| **ownerTypeId**
[`integer`](../../../data-types.md) | Идентификатор типа объекта, к элементу которого привязан комментарий, например `2` у сделки или `1038` у смарт-процесса. У моей компании — `4`, как у компании. Список типов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md) ||
|| **ownerId**
[`integer`](../../../data-types.md) | Идентификатор элемента CRM, к которому привязан комментарий ||
|| **text**
[`string`](../../../data-types.md) | Текст комментария. BB-коды и HTML-теги приходят в том виде, в котором их сохранили. Теги вложенных файлов, например `[DISK FILE ID=n123]`, из текста удаляются ||
|| **authorId**
[`integer`](../../../data-types.md) | Идентификатор автора комментария. Данные пользователя можно получить методом [user.get](../../../user/user-get.md). Если автор не сохранен — `null` ||
|| **createdTime**
[`datetime`](../../../data-types.md) | Дата и время создания комментария ||
|#

Файлы комментария метод не возвращает. Комментарий с вложениями и сами файлы возвращает метод прошлой версии [crm.timeline.comment.get](../../timeline/comments/crm-timeline-comment-get.md) в поле `FILES`.

Если комментарий привязан к нескольким элементам этого типа, в `ownerId` приходит первый из них, который пользователь может просматривать.

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `77161` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Обязательное поле `id` не указано | Передайте `id` комментария ||
|| `id` | В поле `id` требуется тип данных `int` для такого запроса | Передайте идентификатор комментария положительным числом ||
|#

#### Комментарий не найден {#entity-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Запись с ID = `77161` не найдена | Комментария нет, он не привязан к элементу типа из имени метода или у вас нет права на просмотр элемента. Ту же ошибку вызывает идентификатор записи таймлайна другого вида, например дела. Проверьте `id` и имя метода: комментарий сделки возвращает `crm.deal.timeline.comment.get` ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `files` для сущности `CommentDto` | Передавайте в `select` только поля из [таблицы полей комментария](#item) ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Лиды выключены в настройках CRM. Ошибка приходит только у метода лида. Включите лиды ||
|#

#### Функция недоступна на тарифе

Код ошибки: `FEATURE_NOT_AVAILABLE_ON_CURRENT_PLAN`, HTTP-статус **403**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Функция недоступна на текущем тарифе. | Тариф Битрикс24 не включает лиды. Ошибка приходит только у метода лида ||
|#

#### Метод не найден {#method-not-found}

Код ошибки: `BITRIX_REST_V3_EXCEPTION_METHODNOTFOUNDEXCEPTION`, HTTP-статус **404**

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Метод `crm.smartInvoice.timeline.comment.get` не найден | Проверьте имя метода: оно пишется в нижнем регистре, например `crm.smartinvoice.timeline.comment.get`. Для смарт-процесса проверьте `entityTypeId` методом [crm.smartprocess.list](../smart-process-types/crm-smart-process-list-rest-v3.md) ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-entity-timeline-comment-add-rest-v3.md)
- [{#T}](./crm-entity-timeline-comment-list-rest-v3.md)
- [{#T}](../../timeline/comments/crm-timeline-comment-get.md)
