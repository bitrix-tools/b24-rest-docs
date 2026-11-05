# Изменить подразделение department.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Метод `department.update` изменяет подразделение в структуре компании. Поля, которые не переданы, остаются прежними.

Метод относится к прежней версии API. В REST 3.0 название меняет [humanresources.node.edit](./node/humanresources-node-edit.md), переносит подразделение [humanresources.node.move](./node/humanresources-node-move.md), а руководителя назначают [методы участников](./node-member/index.md). Соответствие методов — в [обзоре раздела](./index.md#v2-v3).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`integer`](../data-types.md) | Идентификатор подразделения.

Идентификатор можно получить методом [department.get](./department-get.md) ||
|| **NAME**
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`integer`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT**
[`integer`](../data-types.md) | Идентификатор родительского подразделения.

Передавайте число. Если передана строка, которая не является числом, в том числе пустая, метод вернет ошибку `PARENT must be numeric.` ||
|| **UF_HEAD**
[`integer`](../data-types.md) | Идентификатор пользователя, который будет руководителем подразделения. Чтобы снять руководителя, передайте `0`.

Идентификатор пользователя можно получить методом [user.get](../user/user-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 18,
        "NAME": "Отдел продаж в регионах",
        "SORT": 500
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "ID": 18,
        "NAME": "Отдел продаж в регионах",
        "SORT": 500,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'department.update',
        params: {
          ID: 18,
          NAME: 'Отдел продаж в регионах',
          SORT: 500,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated:', result)
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
      async function updateDepartment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'department.update',
            params: {
              ID: 18,
              NAME: 'Отдел продаж в регионах',
              SORT: 500,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateDepartment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.department.update(
            bitrix_id=18,
            name="Отдел продаж в регионах",
            sort=500,
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
                'department.update',
                [
                    'ID'   => 18,
                    'NAME' => 'Отдел продаж в регионах',
                    'SORT' => 500,
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
        'department.update',
        {
            ID: 18,
            NAME: 'Отдел продаж в регионах',
            SORT: 500,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'department.update',
        [
            'ID'   => 18,
            'NAME' => 'Отдел продаж в регионах',
            'SORT' => 500,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "department.update", b24.Params{
    	"ID":   18,
    	"NAME": "Отдел продаж в регионах",
    	"SORT": 500,
    })
    if err != nil {
    	return fmt.Errorf("department.update: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1736929002.119324,
        "finish": 1736929002.469626,
        "duration": 0.35030198097229004,
        "processing": 0.13488411903381348,
        "date_start": "2025-01-15T08:16:42+00:00",
        "date_finish": "2025-01-15T08:16:42+00:00",
        "operating": 0.13484978675842285
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если подразделение изменено. При неудаче метод возвращает ошибку ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "510",
    "error_description": "Department not found"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `510` | Department not found | Не передан `ID` или подразделения с таким идентификатором нет ||
|| `400` | `ERROR_ARGUMENT` | PARENT must be numeric. | В `PARENT` передана строка, которая не является числом, в том числе пустая ||
|| `400` | Пустое значение | `Неверный раздел-родитель!<br>` | Подразделения с идентификатором из `PARENT` нет ||
|| `400` | `ERROR_CORE` | В структуре компании должен быть только один раздел верхнего уровня. | В `PARENT` передан `0`. Подразделение верхнего уровня в структуре компании может быть только одно ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права изменять структуру компании ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./department-add.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)