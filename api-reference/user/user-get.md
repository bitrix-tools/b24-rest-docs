# Получить список пользователей по фильтру user.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user`](../scopes/permissions.md), [`user_brief`](../scopes/permissions.md), [`user_basic`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `user.get` возвращает список пользователей с фильтрацией, сортировкой и постраничной навигацией.

{% note info "" %}

Метод не возвращает ботов, интеграторов, почтовых пользователей, пользователей Открытых линий и Реплики. Набор полей в ответе зависит от версии скоупа `user` — подробнее в статье [Версии скоупа user](user-scope.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **filter**
[`object`](../data-types.md) | Объект с условиями отбора пользователей [(подробное описание)](#filter).

Без этого параметра метод возвращает всех пользователей, доступных текущему пользователю ||
|| **select**
[`array`](../data-types.md) | Массив с названиями полей, которые вернутся в ответе. Без этого параметра метод возвращает все поля, доступные скоупу приложения или вебхука.

При выборке используйте маски:

- `*` — все доступные поля
- `UF_*` — все доступные пользовательские поля, в том числе созданные в Битрикс24

Недоступные скоупу и несуществующие поля метод пропускает без ошибки ||
|| **sort**
[`string`](../data-types.md) | Поле, по которому сортируется список, например `LAST_NAME`. Доступны поля из [user.add](./user-add.md) и пользовательские поля `UF_*`.

Сортировка применяется, только если переданы оба параметра `sort` и `order` строками. Иначе метод сортирует список по возрастанию `ID`.

Неизвестное поле вызовет ошибку `100` ||
|| **order**
[`string`](../data-types.md) | Направление сортировки:
- `ASC` — по возрастанию
- `DESC` — по убыванию

Регистр значения не важен. Другое значение вызовет ошибку `ERROR_ARGUMENT` ||
|| **ADMIN_MODE**
[`boolean`](../data-types.md) | Режим администратора:
- `true` — метод возвращает всех пользователей, включая пользователей экстранета из любых групп
- `false` — метод возвращает сотрудников компании и пользователей экстранета из групп, в которых состоит текущий пользователь. Пользователь экстранета получает только участников своих групп и себя

Режим включается, только если запрос выполняет администратор. Для остальных пользователей параметр не действует.

По умолчанию — `false` ||
|| **IMAGE_RESIZE**
[`string`](../data-types.md) | Размер копии фотографии в поле `PERSONAL_PHOTO`:

- `small` — 150 × 150 пикселей
- `medium` — 300 × 300 пикселей
- `large` — 1000 × 1000 пикселей

Без этого параметра или с другим значением метод возвращает ссылку на исходное изображение ||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы.

Значение `-1` отключает подсчет общего количества записей: метод возвращает первую страницу и `total` со значением `0`.

По умолчанию — `0` ||
|#

Названия параметров нечувствительны к регистру: `filter` и `FILTER` равнозначны.

### Параметр filter {#filter}

Ключ объекта — поле пользователя, значение — искомое значение или массив значений. Условия объединяются по логике И.

Для отбора доступны поля из [user.add](./user-add.md), разрешенные скоупу приложения или вебхука, и дополнительные поля из таблицы. Неизвестные и недоступные скоупу поля метод игнорирует без ошибки.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) \| [`array`](../data-types.md) | Идентификатор пользователя или массив идентификаторов ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Статус сотрудника:
- `true` — работающие сотрудники
- `false` — уволенные сотрудники

Без этого поля метод возвращает и тех, и других ||
|| **UF_DEPARTMENT**
[`integer`](../data-types.md) \| [`array`](../data-types.md) | Идентификатор подразделения или массив идентификаторов. Метод отбирает пользователей, которые напрямую входят в подразделение, без учета дочерних подразделений.

Идентификаторы подразделений можно получить методом [department.get](../departments/department-get.md) ||
|| **HAS_DEPARTAMENT**
[`string`](../data-types.md) | Отбор пользователей с подразделением:
- `Y` — только пользователи, у которых указано подразделение
- `N` — условие не применяется ||
|| **USER_TYPE**
[`string`](../data-types.md) | Тип пользователя:
- `employee` — сотрудник
- `extranet` — пользователь экстранета

Значения `email` и `bot` метод принимает, но возвращает пустой список: таких пользователей метод не выдает ||
|| **IS_ONLINE**
[`string`](../data-types.md) | Пользователь в сети:
- `Y` — в сети
- `N` — не в сети ||
|| **NAME_SEARCH**
[`string`](../data-types.md) | Быстрый поиск по персональным данным: имени, фамилии и другим полям поискового индекса пользователя. Префиксы к этому полю не применяются ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефонный номер ||
|| **UF_\***
[`any`](../data-types.md) | Пользовательские поля, например `UF_USR_1705409592930`. Если по нестроковому пользовательскому полю передать пустой массив с префиксом `@`, метод вернет пустой результат, с префиксом `!@` — не учтет условие ||
|#

Ключу можно задать префикс, который уточняет условие отбора:

- `=` — равно, точное совпадение. Используется по умолчанию
- `!=`, `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — входит в список, значение передается массивом
- `!@` — не входит в список, значение передается массивом
- `%` — содержит подстроку в любой позиции. Символ `%` в значении передавать не нужно
- `!%` — не содержит подстроку. Символ `%` в значении передавать не нужно
- `=%` и `%=` — шаблон LIKE, символ `%` передается в значении:
    - `"Ива%"` — значения, начинающиеся с «Ива»
    - `"%ова"` — значения, заканчивающиеся на «ова»
    - `"%ван%"` — значения, где «ван» встречается в любой позиции

Без префикса значение с символом `%` тоже работает как шаблон LIKE: `"NAME": "Ива%"` отберет пользователей с именем, начинающимся с «Ива».

Префикс длиннее двух символов, например `!=%` или `!%=`, метод не распознает и условие игнорирует. Для отбора «не соответствует шаблону» используйте `!%` с подстрокой.

Значения полей с датой и временем передавайте в формате ISO 8601, например `2020-01-01T00:00:00+03:00`, или в формате даты вашего Битрикс24. Это относится к полям `TIMESTAMP_X`, `DATE_REGISTER`, `LAST_LOGIN`, `LAST_ACTIVITY_DATE`, `PERSONAL_BIRTHDAY`, `UF_EMPLOYMENT_DATE` и к пользовательским полям типа дата и дата со временем. Если значение не распознано как дата, условие не отберет ни одной записи.

{% note info "" %}

Поля фильтра можно передать и на верхнем уровне запроса, без `filter`, например `{"UF_DEPARTMENT": 1}`. Так работает старый формат запроса. Если в запросе есть `filter`, поля верхнего уровня метод не учитывает.

{% endnote %}

{% note tip "" %}

Чтобы ускорить получение списка:

- передавайте в параметре `select` только те поля, которые нужны в ответе. Если среди них нет пользовательских полей, метод не будет загружать сведения о них
- отключайте подсчет общего количества записей параметром `start = -1`, когда выгружаете большой объем данных. Страницы в этом режиме выбирайте фильтром по последнему полученному идентификатору — [Как получить большой объем данных](../../settings/performance/huge-data.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

Пример получает работающих сотрудников подразделения с идентификатором `1`, отсортированных по фамилии.

{% list tabs %}

- cURL (Webhook)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "filter": {
            "UF_DEPARTMENT": 1,
            "ACTIVE": true
        },
        "select": ["ID", "NAME", "LAST_NAME", "EMAIL", "WORK_POSITION", "UF_DEPARTMENT", "USER_TYPE"],
        "sort": "LAST_NAME",
        "order": "ASC",
        "start": 0
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.get
    ```

- cURL (OAuth)

    ```curl
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "filter": {
            "UF_DEPARTMENT": 1,
            "ACTIVE": true
        },
        "select": ["ID", "NAME", "LAST_NAME", "EMAIL", "WORK_POSITION", "UF_DEPARTMENT", "USER_TYPE"],
        "sort": "LAST_NAME",
        "order": "ASC",
        "start": 0,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type UserData = {
      ID: string
      NAME: string
      LAST_NAME: string
      EMAIL: string
      WORK_POSITION: string
      UF_DEPARTMENT: number[]
      USER_TYPE: string
    }

    try {
      // user.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserData[]>({
        method: 'user.get',
        params: {
          filter: {
            UF_DEPARTMENT: 1,
            ACTIVE: true,
          },
          select: ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'WORK_POSITION', 'UF_DEPARTMENT', 'USER_TYPE'],
          sort: 'LAST_NAME',
          order: 'ASC',
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
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
      async function getUsers() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: {
              filter: {
                UF_DEPARTMENT: 1,
                ACTIVE: true,
              },
              select: ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'WORK_POSITION', 'UF_DEPARTMENT', 'USER_TYPE'],
              sort: 'LAST_NAME',
              order: 'ASC',
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
          console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUsers)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.get(
            filter={
                "UF_DEPARTMENT": 1,
                "ACTIVE": True,
            },
            select=["ID", "NAME", "LAST_NAME", "EMAIL", "WORK_POSITION", "UF_DEPARTMENT", "USER_TYPE"],
            sort="LAST_NAME",
            order="ASC",
            start=0,
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
        $response = $b24Service
            ->core
            ->call(
                'user.get',
                [
                    'filter' => [
                        'UF_DEPARTMENT' => 1,
                        'ACTIVE'        => true,
                    ],
                    'select' => ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'WORK_POSITION', 'UF_DEPARTMENT', 'USER_TYPE'],
                    'sort'   => 'LAST_NAME',
                    'order'  => 'ASC',
                    'start'  => 0,
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

    ```js
    BX24.callMethod(
        "user.get",
        {
            "filter": {
                "UF_DEPARTMENT": 1,
                "ACTIVE": true
            },
            "select": ["ID", "NAME", "LAST_NAME", "EMAIL", "WORK_POSITION", "UF_DEPARTMENT", "USER_TYPE"],
            "sort": "LAST_NAME",
            "order": "ASC",
            "start": 0
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
                return;
            }

            console.dir(result.data());

            if (result.more())
            {
                result.next();
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.get',
        [
            'filter' => [
                'UF_DEPARTMENT' => 1,
                'ACTIVE' => true
            ],
            'select' => ['ID', 'NAME', 'LAST_NAME', 'EMAIL', 'WORK_POSITION', 'UF_DEPARTMENT', 'USER_TYPE'],
            'sort' => 'LAST_NAME',
            'order' => 'ASC',
            'start' => 0
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{
    		"UF_DEPARTMENT": 1,
    		"ACTIVE":        true,
    	},
    	"select": []string{"ID", "NAME", "LAST_NAME", "EMAIL", "WORK_POSITION", "UF_DEPARTMENT", "USER_TYPE"},
    	"sort":   "LAST_NAME",
    	"order":  "ASC",
    	"start":  0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }

    var items []struct {
    	ID           b24.ID `json:"ID"`
    	Name         string `json:"NAME"`
    	LastName     string `json:"LAST_NAME"`
    	Email        string `json:"EMAIL"`
    	WorkPosition string `json:"WORK_POSITION"`
    	Department   []int  `json:"UF_DEPARTMENT"`
    	UserType     string `json:"USER_TYPE"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Name, it.LastName)
    }
    ```

{% endlist %}

### Фильтрация по имени, начинающемуся с «Ива»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"NAME":"Ива%"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"NAME":"Ива%"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type UserData = {
      ID: string
      ACTIVE: boolean
      NAME: string
      LAST_NAME: string
      EMAIL: string
      LAST_LOGIN: ISODate | ''
      DATE_REGISTER: ISODate | ''
      IS_ONLINE: string
      UF_DEPARTMENT: number[]
      USER_TYPE: string
    }

    try {
      // user.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserData[]>({
        method: 'user.get',
        params: {
          filter: {
            NAME: 'Ива%',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
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
      async function getUsersByName() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: {
              filter: {
                NAME: 'Ива%',
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
          console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUsersByName)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.get(
            filter={
                "NAME": "Ива%",
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.get',
                [
                    'filter' => [
                        'NAME' => 'Ива%'
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching user data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "NAME": "Ива%"
            }
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
        'user.get',
        [
            'filter' => [
                'NAME' => 'Ива%'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{
    		"NAME": "Ива%",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }

    var items []struct {
    	ID         b24.ID `json:"ID"`
    	Active     bool   `json:"ACTIVE"`
    	Name       string `json:"NAME"`
    	LastName   string `json:"LAST_NAME"`
    	SecondName string `json:"SECOND_NAME"`
    	Email      string `json:"EMAIL"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Active)
    }
    ```

{% endlist %}

### Фильтрация по фамилии, не содержащей «ов»

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"!%LAST_NAME":"ов"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"!%LAST_NAME":"ов"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type UserData = {
      ID: string
      ACTIVE: boolean
      NAME: string
      LAST_NAME: string
      EMAIL: string
      LAST_LOGIN: ISODate | ''
      DATE_REGISTER: ISODate | ''
      IS_ONLINE: string
      UF_DEPARTMENT: number[]
      USER_TYPE: string
    }

    try {
      // user.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserData[]>({
        method: 'user.get',
        params: {
          filter: {
            '!%LAST_NAME': 'ов',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
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
      async function getUsersByLastName() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: {
              filter: {
                '!%LAST_NAME': 'ов',
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
          console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUsersByLastName)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.get(
            filter={
                "!%LAST_NAME": "ов",
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.get',
                [
                    'filter' => [
                        '!%LAST_NAME' => 'ов',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "!%LAST_NAME": "ов"
            }
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
        'user.get',
        [
            'filter' => [
                '!%LAST_NAME' => 'ов'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{
    		"!%LAST_NAME": "ов",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }

    var items []struct {
    	ID         b24.ID `json:"ID"`
    	Active     bool   `json:"ACTIVE"`
    	Name       string `json:"NAME"`
    	LastName   string `json:"LAST_NAME"`
    	SecondName string `json:"SECOND_NAME"`
    	Email      string `json:"EMAIL"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Active)
    }
    ```

{% endlist %}

### Фильтрация по нескольким городам проживания

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"@PERSONAL_CITY":["Москва","Санкт-Петербург"]}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"filter":{"@PERSONAL_CITY":["Москва","Санкт-Петербург"]},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type UserData = {
      ID: string
      ACTIVE: boolean
      NAME: string
      LAST_NAME: string
      EMAIL: string
      LAST_LOGIN: ISODate | ''
      DATE_REGISTER: ISODate | ''
      IS_ONLINE: string
      PERSONAL_CITY: string
      UF_DEPARTMENT: number[]
      USER_TYPE: string
    }

    try {
      // user.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<UserData[]>({
        method: 'user.get',
        params: {
          filter: {
            '@PERSONAL_CITY': ['Москва', 'Санкт-Петербург'],
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME} (${u.PERSONAL_CITY})`))
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
      async function getUsersByCity() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'user.get',
            params: {
              filter: {
                '@PERSONAL_CITY': ['Москва', 'Санкт-Петербург'],
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
          console.info(`Fetched ${result.length} users:`, result.map(u => `${u.NAME} ${u.LAST_NAME} (${u.PERSONAL_CITY})`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUsersByCity)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.user.get(
            filter={
                "@PERSONAL_CITY": [
                    "Москва",
                    "Санкт-Петербург",
                ],
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

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.get',
                [
                    'filter' => [
                        '@PERSONAL_CITY' => ['Москва', 'Санкт-Петербург']
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting users: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```javascript
    BX24.callMethod(
        "user.get",
        {
            filter: {
                "@PERSONAL_CITY": ["Москва", "Санкт-Петербург"]
            }
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
        'user.get',
        [
            'filter' => [
                '@PERSONAL_CITY' => ['Москва', 'Санкт-Петербург']
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "user.get", b24.Params{
    	"filter": b24.Params{
    		"@PERSONAL_CITY": []string{"Москва", "Санкт-Петербург"},
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("user.get: %w", err)
    }

    var items []struct {
    	ID         b24.ID `json:"ID"`
    	Active     bool   `json:"ACTIVE"`
    	Name       string `json:"NAME"`
    	LastName   string `json:"LAST_NAME"`
    	SecondName string `json:"SECOND_NAME"`
    	Email      string `json:"EMAIL"`
    }
    if err := json.Unmarshal(res.Result, &items); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    for _, it := range items {
    	fmt.Println(it.ID, it.Active)
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1",
            "NAME": "Елена",
            "LAST_NAME": "Андреева",
            "EMAIL": "e.andreeva@example.com",
            "WORK_POSITION": "Руководитель отдела продаж",
            "UF_DEPARTMENT": [1, 47],
            "USER_TYPE": "employee"
        },
        {
            "ID": "1271",
            "NAME": "Иван",
            "LAST_NAME": "Иванов",
            "EMAIL": "i.ivanov@example.com",
            "WORK_POSITION": "Менеджер по продажам",
            "UF_DEPARTMENT": [1],
            "USER_TYPE": "employee"
        }
    ],
    "total": 2,
    "time": {
        "start": 1794316750,
        "finish": 1794316750.180457,
        "duration": 0.18045711517333984,
        "processing": 0,
        "date_start": "2026-11-10T16:19:10+03:00",
        "date_finish": "2026-11-10T16:19:10+03:00",
        "operating_reset_at": 1794317340,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив пользователей, до 50 записей на страницу [(подробное описание)](#user). Если пользователей нет, возвращается пустой массив ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных пользователей. Не возвращается, если `result` пустой. При `start = -1` равно `0` ||
|| **next**
[`integer`](../data-types.md) | Значение `start` для следующей страницы. Возвращается, если записей больше, чем на текущей странице ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект пользователя {#user}

Метод возвращает поля из `select` или все поля, доступные версии скоупа, — список по версиям в статье [Версии скоупа user](user-scope.md). Поле со значением `null` в ответ не попадает, пустые строки возвращаются. В таблице основные поля, полный список — в [описании полей пользователя](user-current.md#user-fields).

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../data-types.md) | Идентификатор пользователя. Число в виде строки ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний код пользователя ||
|| **ACTIVE**
[`boolean`](../data-types.md) | Статус сотрудника:
- `true` — работает
- `false` — уволен ||
|| **NAME**
[`string`](../data-types.md) | Имя ||
|| **LAST_NAME**
[`string`](../data-types.md) | Фамилия ||
|| **SECOND_NAME**
[`string`](../data-types.md) | Отчество ||
|| **EMAIL**
[`string`](../data-types.md) | E-mail ||
|| **LAST_LOGIN**
[`string`](../data-types.md) | Дата и время последней авторизации в формате ISO 8601, например `2026-11-09T15:34:45+03:00` ||
|| **DATE_REGISTER**
[`string`](../data-types.md) | Дата регистрации в формате ISO 8601 ||
|| **TIME_ZONE**
[`string`](../data-types.md) | Часовой пояс пользователя, например `Europe/Moscow` ||
|| **IS_ONLINE**
[`string`](../data-types.md) | Пользователь в сети:
- `Y` — в сети
- `N` — не в сети ||
|| **TIMESTAMP_X**
[`object`](../data-types.md) | Дата последнего изменения профиля. Метод возвращает пустой объект `{}` ||
|| **LAST_ACTIVITY_DATE**
[`object`](../data-types.md) | Дата последней активности. Метод возвращает пустой объект `{}` ||
|| **PERSONAL_GENDER**
[`string`](../data-types.md) | Пол:
- `M` — мужской
- `F` — женский
- пустая строка — не указан ||
|| **PERSONAL_BIRTHDAY**
[`string`](../data-types.md) | Дата рождения в формате ISO 8601. Пустая строка, если не указана ||
|| **PERSONAL_PHOTO**
[`string`](../data-types.md) | Ссылка на фотографию профиля. Размер копии задает параметр `IMAGE_RESIZE` ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Личный мобильный телефон ||
|| **PERSONAL_CITY**
[`string`](../data-types.md) | Город проживания ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Рабочий телефон ||
|| **WORK_POSITION**
[`string`](../data-types.md) | Должность ||
|| **UF_EMPLOYMENT_DATE**
[`string`](../data-types.md) | Дата приема на работу. Пустая строка, если не указана ||
|| **UF_DEPARTMENT**
[`array`](../data-types.md) | Массив идентификаторов подразделений пользователя ||
|| **UF_PHONE_INNER**
[`string`](../data-types.md) | Внутренний телефонный номер ||
|| **USER_TYPE**
[`string`](../data-types.md) | Тип пользователя:
- `employee` — сотрудник
- `extranet` — пользователь экстранета ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ARGUMENT",
    "error_description": "Invalid order \"ZZZ\"",
    "argument": ""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `ERROR_ARGUMENT` | Invalid order "`значение`" | В `order` передано значение, отличное от `ASC` и `DESC` ||
|| `400` | `100` | Unknown field definition `FIELD` (`FIELD`) for \Bitrix\Intranet\User Entity. | В `sort` передано поле, которого нет у пользователя ||
|| `401` | `insufficient_scope` | The request requires higher privileges than provided by the webhook token | У вебхука или приложения нет ни одной версии скоупа: `user`, `user_basic` или `user_brief` ||
|| `401` | `INVALID_CREDENTIALS` | Invalid request credentials | Неверный код вебхука или токен авторизации ||
|#

Некорректный `filter` или неизвестное поле в нем метод игнорирует без ошибки и возвращает список без этого условия.

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-add.md)
- [{#T}](./user-update.md)
- [{#T}](./user-current.md)
- [{#T}](./user-search.md)
- [{#T}](./user-fields.md)
- [{#T}](../departments/department-get.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/how-to-get-elements-by-stage-filter.md)
- [{#T}](../../tutorials/crm/how-to-add-crm-objects/how-to-send-email.md)
- [{#T}](../../tutorials/crm/how-to-get-lists/get-activity-list-by-deals.md)
