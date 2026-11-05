# Создать подразделение department.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`department`](../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение структуры

Метод `department.add` создает подразделение в структуре компании и возвращает его идентификатор. Новое подразделение входит в родительское, которое указано в `PARENT`.

Метод относится к прежней версии API. Аналог в REST 3.0 — [humanresources.node.add](./node/humanresources-node-add.md), соответствие методов — в [обзоре раздела](./index.md#v2-v3).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../data-types.md) | Название подразделения ||
|| **SORT**
[`integer`](../data-types.md) | Поле сортировки подразделения ||
|| **PARENT***
[`integer`](../data-types.md) | Идентификатор родительского подразделения.

Передавайте число. Если параметр не передан, метод вернет ошибку `Argument 'PARENT' is null or empty`. Если передана строка, которая не является числом, в том числе пустая, — ошибку `PARENT must be numeric.`

Идентификатор подразделения можно получить методом [department.get](./department-get.md) ||
|| **UF_HEAD**
[`integer`](../data-types.md) | Идентификатор пользователя, который станет руководителем подразделения. Метод не проверяет, есть ли такой пользователь в Битрикс24: с несуществующим идентификатором подразделение создастся без ошибки, и этот идентификатор сохранится в `UF_HEAD`.

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
        "NAME": "Отдел продаж в регионах",
        "SORT": 450,
        "UF_HEAD": 1,
        "PARENT": 1
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/department.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
        "NAME": "Отдел продаж в регионах",
        "SORT": 450,
        "UF_HEAD": 1,
        "PARENT": 1,
        "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/department.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'department.add',
        params: {
          NAME: 'Отдел продаж в регионах',
          SORT: 450,
          UF_HEAD: 1,
          PARENT: 1,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created department ID:', result)
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
      async function addDepartment() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'department.add',
            params: {
              NAME: 'Отдел продаж в регионах',
              SORT: 450,
              UF_HEAD: 1,
              PARENT: 1,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Created department ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addDepartment)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.department.add(
            name="Отдел продаж в регионах",
            sort=450,
            uf_head=1,
            parent=1,
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
                'department.add',
                [
                    'NAME'    => 'Отдел продаж в регионах',
                    'SORT'    => 450,
                    'UF_HEAD' => 1,
                    'PARENT'  => 1,
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
        'department.add',
        {
            NAME: 'Отдел продаж в регионах',
            SORT: 450,
            UF_HEAD: 1,
            PARENT: 1,
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
        'department.add',
        [
            'NAME'    => 'Отдел продаж в регионах',
            'SORT'    => 450,
            'UF_HEAD' => 1,
            'PARENT'  => 1,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "department.add", b24.Params{
    	"NAME":    "Отдел продаж в регионах",
    	"SORT":    450,
    	"UF_HEAD": 1,
    	"PARENT":  1,
    })
    if err != nil {
    	return fmt.Errorf("department.add: %w", err)
    }

    var newID b24.ID
    if err := json.Unmarshal(res.Result, &newID); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("идентификатор:", newID)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 18,
    "time": {
        "start": 1736927311.779587,
        "finish": 1736927312.132503,
        "duration": 0.35291600227355957,
        "processing": 0.17050600051879883,
        "date_start": "2025-01-15T07:48:31+00:00",
        "date_finish": "2025-01-15T07:48:32+00:00",
        "operating": 0.1704881191253662
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного подразделения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Неверный раздел-родитель!<br>"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | `Не введено название раздела.<br>` | Не передан параметр `NAME` ||
|| `400` | `ERROR_ARGUMENT` | Argument 'PARENT' is null or empty | Не передан обязательный параметр `PARENT`. В ответе есть поле `argument` со значением `PARENT` ||
|| `400` | `ERROR_ARGUMENT` | PARENT must be numeric. | В `PARENT` передана строка, которая не является числом, в том числе пустая ||
|| `400` | Пустое значение | `Неверный раздел-родитель!<br>` | Подразделения с идентификатором из `PARENT` нет ||
|| `400` | `ERROR_CORE` | В структуре компании должен быть только один раздел верхнего уровня. | В `PARENT` передан `0`. Подразделение верхнего уровня в структуре компании может быть только одно ||
|| `403` | `ACCESS_DENIED` | Access denied! | У пользователя нет права изменять структуру компании ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./department-update.md)
- [{#T}](./department-get.md)
- [{#T}](./department-delete.md)
- [{#T}](./department-fields.md)