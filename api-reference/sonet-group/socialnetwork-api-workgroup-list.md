# Получить список рабочих групп socialnetwork.api.workgroup.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`socialnetwork`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `socialnetwork.api.workgroup.list` возвращает список рабочих групп, проектов, скрамов и коллаб с учетом прав текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Смотрите ниже [список доступных полей для фильтрации](#filterable).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно

Если в `params` не передан `IS_ADMIN = Y`, метод автоматически добавляет проверку прав текущего пользователя `CHECK_PERMISSIONS`.

Метод также всегда добавляет фильтр по сайту: 

- для экстранет-пользователя берется экстранет-сайт
- для остальных — сайт из `params[siteId]` или текущий сайт портала ||
|| **select**
[`array`](../data-types.md) | Массив, содержащий список полей, которые необходимо выбрать.

Смотрите ниже [список доступных полей для выборки](#selectable).

Если параметр не передан или пуст, выбирается только `ID`. Поле `ID` возвращается всегда, даже если его нет в `select`. Неизвестные поля метод игнорирует ||
|| **order**
[`object`](../data-types.md) | Объект сортировки в формате `{"field_1": "order_1", ..., "field_N": "order_N"}`.

Возможные значения для `field` соответствуют полям из [списка доступных полей для фильтрации](#filterable).

Возможные значения для `order`:

- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию ||
|| **params**
[`object`](../data-types.md) | Дополнительные [параметры запроса](#params) ||
|| **start**
[`integer`](../data-types.md) | Параметр постраничной навигации.

Размер страницы результатов — 50 записей.

Чтобы получить вторую страницу, передайте `50`; третью — `100` и так далее.

Формула: `start = (N - 1) * 50`, где `N` — номер страницы.

Если передать `-1`, в ответе не будет поля `total` ||
|#

### Доступные поля для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **NAME**
[`string`](../data-types.md) | Название группы ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Признак активности группы: `Y` или `N` ||
|| **VISIBLE**
[`boolean`](../data-types.md) | Видимость группы в общем списке: `Y` или `N` ||
|| **OPENED**
[`boolean`](../data-types.md) | Открыта ли группа для свободного вступления: `Y` или `N` ||
|| **CLOSED**
[`boolean`](../data-types.md) | Находится ли группа в архиве: `Y` или `N` ||
|| **PROJECT**
[`boolean`](../data-types.md) | Тип объекта: `Y` — проект, `N` — группа ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта группы ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания группы ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения группы ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности ||
|#

### Доступные поля для выборки {#selectable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Признак активности группы: `Y` или `N` ||
|| **SUBJECT_ID**
[`integer`](../data-types.md) | Идентификатор тематики группы ||
|| **NAME**
[`string`](../data-types.md) | Название группы ||
|| **DESCRIPTION**
[`text`](../data-types.md) | Описание группы ||
|| **KEYWORDS**
[`string`](../data-types.md) | Ключевые слова группы ||
|| **CLOSED**
[`boolean`](../data-types.md) | Признак архивной группы: `Y` или `N` ||
|| **VISIBLE**
[`boolean`](../data-types.md) | Признак видимости группы: `Y` или `N` ||
|| **OPENED**
[`boolean`](../data-types.md) | Признак открытой группы: `Y` или `N` ||
|| **PROJECT**
[`boolean`](../data-types.md) | Признак проекта: `Y` или `N` ||
|| **LANDING**
[`boolean`](../data-types.md) | Признак группы для публикации: `Y` или `N` ||
|| **DATE_CREATE**
[`datetime`](../data-types.md) | Дата создания ||
|| **DATE_UPDATE**
[`datetime`](../data-types.md) | Дата изменения ||
|| **DATE_ACTIVITY**
[`datetime`](../data-types.md) | Дата последней активности ||
|| **IMAGE_ID**
[`integer`](../data-types.md) | Идентификатор пользовательского аватара ||
|| **AVATAR_TYPE**
[`string`](../data-types.md) | Тип системного аватара ||
|| **OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца ||
|| **NUMBER_OF_MEMBERS**
[`integer`](../data-types.md) | Количество участников ||
|| **NUMBER_OF_MODERATORS**
[`integer`](../data-types.md) | Количество модераторов ||
|| **INITIATE_PERMS**
[`enum`](../data-types.md) | Кто может приглашать участников:

- `A` — только владелец группы
- `E` — владелец и модераторы
- `K` — все участники ||
|| **PROJECT_DATE_START**
[`datetime`](../data-types.md) | Дата начала проекта ||
|| **PROJECT_DATE_FINISH**
[`datetime`](../data-types.md) | Дата окончания проекта ||
|| **SCRUM_OWNER_ID**
[`integer`](../data-types.md) | Идентификатор владельца скрама ||
|| **SCRUM_MASTER_ID**
[`integer`](../data-types.md) | Идентификатор скрам-мастера ||
|| **SCRUM_SPRINT_DURATION**
[`integer`](../data-types.md) | Длительность спринта в секундах ||
|| **SCRUM_TASK_RESPONSIBLE**
[`enum`](../data-types.md) | Ответственный по умолчанию в скраме:

- `A` — постановщик
- `M` — скрам-мастер ||
|| **TYPE**
[`string`](../data-types.md) | Тип группы: `group`, `project`, `scrum`, `collab` ||
|| **AVATAR**
[`string`](../data-types.md) | URL аватара ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **IS_ADMIN**
[`string`](../data-types.md) | Отключение проверки прав.

Возможные значения:
- `Y` — отключить проверку прав, если текущий пользователь администратор

Если передан `Y` не администратором, значение игнорируется ||
|| **siteId**
[`string`](../data-types.md) | Идентификатор сайта, который будет подставлен в автоматический фильтр `SITE_ID` для обычных пользователей.

Для экстранет-пользователей это значение игнорируется: метод всегда использует экстранет-сайт ||
|| **mode**
[`string`](../data-types.md) | Режим ответа.

Поддерживаемое значение:
- `mobile` — добавляет в каждый элемент списка поле `additionalData`

Поле `additionalData` имеет структуру:
  - `role` — роль текущего пользователя в группе
  - `initiatedByType` — кто инициировал связь пользователя с группой:
    - `U` — сам пользователь (например, отправил запрос на вступление)
    - `G` — группа (например, пользователю отправили приглашение)
  - `features` — список доступных инструментов группы (возвращается, если переданы `features`/`mandatoryFeatures`) ||
|| **features**
[`string[]`](../data-types.md) | Список кодов инструментов группы, которые нужно учитывать при формировании `additionalData` в режиме `mobile` ||
|| **mandatoryFeatures**
[`string[]`](../data-types.md) | Коды инструментов из `features`, которые нужно включить в `additionalData.features` независимо от прав текущего пользователя ||
|| **shouldSelectHasCollabers**
[`boolean`](../data-types.md) | Добавлять ли в `additionalData` признак наличия внешних участников `hasCollabers`.

Возможные значения:
- `true` или `Y` — добавить признак
- `false` или `N` — не добавлять признак

По умолчанию — `false` ||
|| **shouldEnsureHasCollabers**
[`boolean`](../data-types.md) | Пересчитать ли признак `hasCollabers` перед возвратом ответа.

Параметр учитывается, только если `shouldSelectHasCollabers` имеет значение `true` или `Y`.

Возможные значения:
- `true` или `Y` — пересчитать признак
- `false` или `N` — вернуть сохраненное значение

По умолчанию — `false` ||
|| **shouldSelectDialogId**
[`string`](../data-types.md) | Добавлять ли в элемент списка поле с идентификатором чата `dialogId`.

Возможные значения:
- `Y` — добавить `dialogId`
- `N` — не добавлять `dialogId`
  
По умолчанию — `N` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ACTIVE":"Y","CLOSED":"N","%NAME":"группа"},"select":["ID","NAME","TYPE","AVATAR"],"order":{"ID":"DESC"},"params":{"mode":"mobile","shouldSelectDialogId":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/socialnetwork.api.workgroup.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"ACTIVE":"Y","CLOSED":"N","%NAME":"группа"},"select":["ID","NAME","TYPE","AVATAR"],"order":{"ID":"DESC"},"params":{"mode":"mobile","shouldSelectDialogId":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/socialnetwork.api.workgroup.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type WorkgroupListResult = {
      workgroups: Workgroup[]
    }

    type Workgroup = {
      id: number
      name: string
      type: 'group' | 'project' | 'scrum' | 'collab' | null
      imageId: number
      avatarType: string | null
      avatar: string
      additionalData: {
        role: string
        initiatedByType: string
        features?: string[]
        hasCollabers?: boolean
      }
      dialogId: string
    }

    try {
      // socialnetwork.api.workgroup.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<WorkgroupListResult>({
        method: 'socialnetwork.api.workgroup.list',
        params: {
          filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'group' },
          select: ['ID', 'NAME', 'TYPE', 'AVATAR'],
          order: { ID: 'DESC' },
          params: { mode: 'mobile', shouldSelectDialogId: 'Y' },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Workgroups:', result.workgroups.length, result.workgroups)
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
      async function fetchWorkgroupList() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // socialnetwork.api.workgroup.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'socialnetwork.api.workgroup.list',
            params: {
              filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'group' },
              select: ['ID', 'NAME', 'TYPE', 'AVATAR'],
              order: { ID: 'DESC' },
              params: { mode: 'mobile', shouldSelectDialogId: 'Y' },
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Workgroups:', result.workgroups.length, result.workgroups)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchWorkgroupList)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.socialnetwork.api.workgroup.list(
            filter={
                "ACTIVE": "Y",
                "CLOSED": "N",
                "%NAME": "группа",
            },
            select=[
                "ID",
                "NAME",
                "TYPE",
                "AVATAR",
            ],
            order={
                "ID": "DESC",
            },
            params={
                "mode": "mobile",
                "shouldSelectDialogId": "Y",
            },
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

    Пример `as_list`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.socialnetwork.api.workgroup.list(
            filter={
                "ACTIVE": "Y",
                "CLOSED": "N",
                "%NAME": "группа",
            },
            select=[
                "ID",
                "NAME",
                "TYPE",
                "AVATAR",
            ],
            order={
                "ID": "DESC",
            },
            params={
                "mode": "mobile",
                "shouldSelectDialogId": "Y",
            },
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
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

    Пример `as_list_fast`

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.socialnetwork.api.workgroup.list(
            filter={
                "ACTIVE": "Y",
                "CLOSED": "N",
                "%NAME": "группа",
            },
            select=[
                "ID",
                "NAME",
                "TYPE",
                "AVATAR",
            ],
            order={
                "ID": "DESC",
            },
            params={
                "mode": "mobile",
                "shouldSelectDialogId": "Y",
            },
        ).as_list_fast(descending=True).response
        result = bitrix_response.result
        for item in result:
            print(item)
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
        $response = $b24Service
            ->core
            ->call(
                'socialnetwork.api.workgroup.list',
                [
                    'filter' => ['ACTIVE' => 'Y', 'CLOSED' => 'N', '%NAME' => 'группа'],
                    'select' => ['ID', 'NAME', 'TYPE', 'AVATAR'],
                    'order' => ['ID' => 'DESC'],
                    'params' => [
                        'mode' => 'mobile',
                        'shouldSelectDialogId' => 'Y',
                    ],
                ]
            );

        print_r($response->getResponseData()->getResult());
    } catch (\Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'socialnetwork.api.workgroup.list',
        {
            filter: { ACTIVE: 'Y', CLOSED: 'N', '%NAME': 'группа' },
            select: ['ID', 'NAME', 'TYPE', 'AVATAR'],
            order: { ID: 'DESC' },
            params: { mode: 'mobile', shouldSelectDialogId: 'Y' }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'socialnetwork.api.workgroup.list',
        [
            'filter' => ['ACTIVE' => 'Y', 'CLOSED' => 'N', '%NAME' => 'группа'],
            'select' => ['ID', 'NAME', 'TYPE', 'AVATAR'],
            'order' => ['ID' => 'DESC'],
            'params' => [
                'mode' => 'mobile',
                'shouldSelectDialogId' => 'Y',
            ],
        ]
    );

    print_r($result);
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "socialnetwork.api.workgroup.list", b24.Params{
    	"filter": b24.Params{
    		"ACTIVE": "Y",
    		"CLOSED": "N",
    		"%NAME":  "группа",
    	},
    	"select": []string{"ID", "NAME", "TYPE", "AVATAR"},
    	"order": b24.Params{
    		"ID": "DESC",
    	},
    	"params": b24.Params{
    		"mode":                 "mobile",
    		"shouldSelectDialogId": "Y",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("socialnetwork.api.workgroup.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "workgroups".
    raw, ok := b24.Unwrap(res.Result, "workgroups")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа workgroups")
    }

    var items []struct {
    	ID       b24.ID `json:"id"`
    	Name     string `json:"name"`
    	Type     string `json:"type"`
    	ImageID  b24.ID `json:"imageId"`
    	Avatar   string `json:"avatar"`
    	DialogID string `json:"dialogId"`
    }
    if err := json.Unmarshal(raw, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "workgroups": [
            {
                "id": 5,
                "name": "Открытая группа для всех",
                "type": "group",
                "imageId": 5,
                "avatarType": null,
                "avatar": "https://test.bitrix24.ru/b13743910/resize_cache/5/7acf4caaf5d8/socialnetwork/8d6/8d2c04ece929572/3.png",
                "additionalData": {
                    "role": "",
                    "initiatedByType": ""
                },
                "dialogId": ""
            },
            {
                "id": 1,
                "name": "Закрытая видимая группа",
                "type": "group",
                "imageId": 1,
                "avatarType": null,
                "avatar": "",
                "additionalData": {
                    "role": "",
                    "initiatedByType": ""
                },
                "dialogId": "chat177"
            }
        ]
    },
    "total": 2,
    "time": {
        "start": 1774357689,
        "finish": 1774357689.398272,
        "duration": 0.3982720375061035,
        "processing": 0,
        "date_start": "2026-03-24T16:08:09+03:00",
        "date_finish": "2026-03-24T16:08:09+03:00",
        "operating_reset_at": 1774358289,
        "operating": 0.12220001220703125
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект ответа ||
|| **workgroups**
[`object[]`](../data-types.md) | Список рабочих групп с [описанием полей](#workgroup-fields).

Состав объекта зависит от переданных полей в `select` и параметров `params`.

Если группы по фильтру не найдены, `workgroups` вернется пустым массивом ||
|| **next**
[`integer`](../data-types.md) | Смещение для следующей страницы. Поле возвращается, если есть еще записи ||
|| **total**
[`integer`](../data-types.md) | Общее число записей. Поле не возвращается, если запрос выполнен со `start = -1` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Поля объекта workgroup {#workgroup-fields}

Поля для выборки передаются в `select` в формате `UPPER_SNAKE_CASE`, а в ответе возвращаются в формате `camelCase`. Например, `DATE_CREATE` соответствует `dateCreate`, а `NUMBER_OF_MEMBERS` — `numberOfMembers`.

#|
|| **Поле ответа**
`тип` | **Поле в select или условие возврата** | **Описание** ||
|| **id**
[`integer`](../data-types.md) | `ID` | Идентификатор группы. Возвращается всегда ||
|| **active**
[`boolean`](../data-types.md) | `ACTIVE` | Признак активности группы: `Y` или `N` ||
|| **subjectId**
[`integer`](../data-types.md) | `SUBJECT_ID` | Идентификатор тематики группы ||
|| **name**
[`string`](../data-types.md) | `NAME` | Название группы ||
|| **description**
[`text`](../data-types.md) | `DESCRIPTION` | Описание группы ||
|| **keywords**
[`string`](../data-types.md) | `KEYWORDS` | Ключевые слова группы ||
|| **closed**
[`boolean`](../data-types.md) | `CLOSED` | Признак архивной группы: `Y` или `N` ||
|| **visible**
[`boolean`](../data-types.md) | `VISIBLE` | Признак видимости группы: `Y` или `N` ||
|| **opened**
[`boolean`](../data-types.md) | `OPENED` | Признак открытой группы: `Y` или `N` ||
|| **project**
[`boolean`](../data-types.md) | `PROJECT` | Признак проекта: `Y` или `N` ||
|| **landing**
[`boolean`](../data-types.md) | `LANDING` | Признак группы для публикации: `Y` или `N` ||
|| **dateCreate**
[`datetime`](../data-types.md) | `DATE_CREATE` | Дата создания группы ||
|| **dateUpdate**
[`datetime`](../data-types.md) | `DATE_UPDATE` | Дата изменения группы ||
|| **dateActivity**
[`datetime`](../data-types.md) | `DATE_ACTIVITY` | Дата последней активности ||
|| **imageId**
[`integer`](../data-types.md) | `IMAGE_ID` или `AVATAR` | Идентификатор пользовательского аватара ||
|| **avatarType**
[`string`](../data-types.md) \| `null` | `AVATAR_TYPE` или `AVATAR` | Тип системного аватара ||
|| **avatar**
[`string`](../data-types.md) | `AVATAR` | URL аватара. Если аватар не задан, возвращается пустая строка ||
|| **ownerId**
[`integer`](../data-types.md) | `OWNER_ID` | Идентификатор владельца ||
|| **numberOfMembers**
[`integer`](../data-types.md) | `NUMBER_OF_MEMBERS` | Количество участников ||
|| **numberOfModerators**
[`integer`](../data-types.md) | `NUMBER_OF_MODERATORS` | Количество модераторов ||
|| **initiatePerms**
[`enum`](../data-types.md) | `INITIATE_PERMS` | Кто может приглашать участников: `A` — владелец, `E` — владелец и модераторы, `K` — все участники ||
|| **projectDateStart**
[`datetime`](../data-types.md) \| `null` | `PROJECT_DATE_START` | Дата начала проекта ||
|| **projectDateFinish**
[`datetime`](../data-types.md) \| `null` | `PROJECT_DATE_FINISH` | Дата окончания проекта ||
|| **scrumOwnerId**
[`integer`](../data-types.md) | `SCRUM_OWNER_ID` | Идентификатор владельца скрама ||
|| **scrumMasterId**
[`integer`](../data-types.md) | `SCRUM_MASTER_ID` | Идентификатор скрам-мастера ||
|| **scrumSprintDuration**
[`integer`](../data-types.md) | `SCRUM_SPRINT_DURATION` | Длительность спринта в секундах ||
|| **scrumTaskResponsible**
[`enum`](../data-types.md) | `SCRUM_TASK_RESPONSIBLE` | Ответственный по умолчанию: `A` — постановщик, `M` — скрам-мастер ||
|| **type**
[`string`](../data-types.md) \| `null` | `TYPE` | Тип группы: `group`, `project`, `scrum`, `collab` ||
|| **additionalData**
[`object`](../data-types.md) | `params[mode] = mobile` | Дополнительные данные о группе и текущем пользователе [(подробное описание)](#additional-data) ||
|| **dialogId**
[`string`](../data-types.md) | `params[shouldSelectDialogId] = Y` | Идентификатор чата группы. Если чат не найден, возвращается пустая строка ||
|#

#### Объект additionalData {#additional-data}

#|
|| **Название**
`тип` | **Описание** ||
|| **role**
[`string`](../data-types.md) | Роль текущего пользователя в группе. Если пользователь не связан с группой, возвращается пустая строка ||
|| **initiatedByType**
[`string`](../data-types.md) | Кто инициировал связь пользователя с группой:

- `U` — пользователь
- `G` — группа

Если пользователь не связан с группой, возвращается пустая строка ||
|| **features**
[`string[]`](../data-types.md) | Коды доступных инструментов группы. Поле возвращается, если в `params` переданы `features` или `mandatoryFeatures` ||
|| **hasCollabers**
[`boolean`](../data-types.md) | Есть ли в группе внешние участники. Поле возвращается, если `params[shouldSelectHasCollabers]` имеет значение `true` или `Y` ||
|#

## Обработка ошибок

HTTP-статус: **401**

```json
{
    "error": "insufficient_scope",
    "error_description": "The request requires higher privileges than provided by the webhook token"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `insufficient_scope` | Недостаточно скоупа у токена | Токен не содержит скоуп `socialnetwork` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-create.md)
- [{#T}](./sonet-group-update.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./sonet-group-get.md)
- [{#T}](./sonet-group-delete.md)
