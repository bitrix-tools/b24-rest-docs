# Получить список нумераторов crm.documentgenerator.numerator.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом "изменения" шаблонов генератора документов

Метод `crm.documentgenerator.numerator.list` возвращает постраничный список нумераторов.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../../data-types.md) | Смещение для постраничной навигации. Размер страницы — 50 записей.

Для страницы с номером `N` вычислите значение по формуле:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

Метод не возвращает общее количество нумераторов и поле `next`. Для последовательной загрузки увеличивайте `start` на 50, пока массив `numerators` не станет пустым или не вернет меньше 50 элементов.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.numerator.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"start":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.numerator.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type NumeratorResult = {
      numerators: {
        id: string
        name: string
        template: string
        settings: Record<string, {
          start: number
          step: number
          length?: number
          padString?: string
          periodicBy: string | null
          timezone: string | null
          isDirectNumeration: boolean
        }>
      }[]
    }

    try {
      const response = await $b24.actions.v2.call.make<NumeratorResult>({
        method: 'crm.documentgenerator.numerator.list',
        params: {
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Numerators count:', result.numerators.length, result.numerators)
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
      async function listNumerators() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.numerator.list',
            params: {
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
          console.info('Numerators count:', result.numerators.length, result.numerators)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listNumerators)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.documentgenerator.numerator.list(start=0).response
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
        bitrix_response = client.crm.documentgenerator.numerator.list().as_list().response
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
        bitrix_response = client.crm.documentgenerator.numerator.list().as_list_fast(descending=True).response
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
                'crm.documentgenerator.numerator.list',
                [
                    'start' => 0,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting numerators list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.numerator.list',
        {
            start: 0,
        },
        (result) => {
            if (result.error()) {
                console.error(result.error());
                return;
            }

            console.info(result.data());
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.numerator.list',
        [
            'start' => 0,
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.documentgenerator.numerator.list", b24.Params{
    	"start": 0,
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.documentgenerator.numerator.list: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "numerators".
    raw, ok := b24.Unwrap(res.Result, "numerators")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа numerators")
    }

    var items []struct {
    	ID       b24.ID `json:"id"`
    	Name     string `json:"name"`
    	Template string `json:"template"`
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
        "numerators": [
            {
                "id": "2",
                "name": "Акт (Россия)",
                "template": "{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 1,
                        "step": 1,
                        "periodicBy": null,
                        "timezone": null,
                        "isDirectNumeration": false
                    }
                }
            },
            {
                "id": "45",
                "name": "Нумератор из REST (обновлен)",
                "template": "INV-{NUMBER}",
                "settings": {
                    "Bitrix_Main_Numerator_Generator_SequentNumberGenerator": {
                        "start": 100,
                        "step": 1,
                        "length": 0,
                        "padString": "0",
                        "periodicBy": null,
                        "timezone": null,
                        "isDirectNumeration": false
                    }
                }
            }
        ]
    },
    "total": 19,
    "time": {
        "start": 1773750210,
        "finish": 1773750210.283658,
        "duration": 0.2836580276489258,
        "processing": 0,
        "date_start": "2026-03-17T15:23:30+03:00",
        "date_finish": "2026-03-17T15:23:30+03:00",
        "operating_reset_at": 1773750810,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит массив объектов [`numerators`](#numerators) ||
|| **total**
[`integer`](../../../data-types.md) | Количество нумераторов на текущей странице. Поле не содержит общее количество записей во всей выборке ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Массив numerators {#numerators}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`string`](../../../data-types.md) | Идентификатор нумератора ||
|| **name**
[`string`](../../../data-types.md) | Название нумератора ||
|| **template**
[`string`](../../../data-types.md) | Шаблон номера ||
|| **settings**
[`object`](../../../data-types.md) | Сохраненные настройки последовательной нумерации типа [`settings`](#settings) ||
|#

#### Тип settings {#settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **Bitrix_Main_Numerator_Generator_SequentNumberGenerator**
[`object`](../../../data-types.md) | Настройки генератора последовательных номеров [(подробное описание)](#sequent-number-generator) ||
|#

#### Тип Bitrix_Main_Numerator_Generator_SequentNumberGenerator {#sequent-number-generator}

#|
|| **Название**
`тип` | **Описание** ||
|| **start**
[`integer`](../../../data-types.md) | Начальное значение счетчика ||
|| **step**
[`integer`](../../../data-types.md) | Шаг увеличения счетчика ||
|| **length**
[`integer`](../../../data-types.md) | Минимальная длина номера ||
|| **padString**
[`string`](../../../data-types.md) | Символ добивки слева ||
|| **periodicBy**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Период сброса счетчика. Возвращается `null`, если периодический сброс выключен ||
|| **timezone**
[`string`](../../../data-types.md) \| [`null`](../../../data-types.md) | Идентификатор часового пояса для периодического сброса. Возвращается `null`, если часовой пояс не задан ||
|| **isDirectNumeration**
[`boolean`](../../../data-types.md) | Признак прямой нумерации ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "You do not have permissions to modify templates"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `Пустое значение` | `You do not have permissions to modify templates` | Недостаточно прав для изменения шаблонов генератора документов ||
|| `Пустое значение` | `Module documentgenerator is not installed` | Модуль `documentgenerator` недоступен ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-document-generator-numerator-add.md)
- [{#T}](./crm-document-generator-numerator-update.md)
- [{#T}](./crm-document-generator-numerator-get.md)
- [{#T}](./crm-document-generator-numerator-delete.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

