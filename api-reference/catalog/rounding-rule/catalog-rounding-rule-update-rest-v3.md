# Изменить правило округления цен v 3.0 catalog.roundingrule.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Управление типами цен»

{% note info "" %}

Метод относится к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../rest-v3.md).

{% endnote %}

Метод `catalog.roundingrule.update` изменяет правило округления цен и возвращает его поля после изменения.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор правила округления.

Идентификатор можно получить методом [catalog.roundingrule.list](./catalog-rounding-rule-list-rest-v3.md) ||
|| **fields***
[`object`](../../data-types.md) | Объект с полями правила округления, которые нужно изменить. Передавайте только изменяемые поля. [Описание полей](#fields) ||
|#

### Параметр fields {#fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **catalogGroupId**
[`integer`](../../data-types.md) | Идентификатор типа цены, для которого действует правило. Тип цены должен существовать.

Идентификатор можно получить методом [catalog.pricetype.list](../price-type/catalog-price-type-list-rest-v3.md) ||
|| **price**
[`double`](../../data-types.md) | Минимальная цена, начиная с которой применяется правило. `0` — правило для всех цен типа.

Отрицательное значение вызывает ошибку. У одного типа цены не может быть двух правил с одинаковым `price` ||
|| **roundType**
[`integer`](../../data-types.md) | Тип округления.

Возможные значения:

- `1` — математическое округление
- `2` — округление в большую сторону, в пользу магазина
- `4` — округление в меньшую сторону, в пользу клиента ||
|| **roundPrecision**
[`double`](../../data-types.md) | Точность округления, например `10` — округление до десятков.

Возможные значения: `0.0001`, `0.001`, `0.005`, `0.01`, `0.02`, `0.05`, `0.1`, `0.2`, `0.5`, `1`, `2`, `5`, `10`, `20`, `50`, `100`, `200`, `500`, `1000`, `5000` ||
|#

Поля `id`, `createdBy`, `dateCreate`, `modifiedBy`, `dateModify` заполняются автоматически. Если передать их в `fields`, метод вернет ошибку. Пустой объект `fields` не меняет поля правила, но обновляет `modifiedBy` и `dateModify`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% note info "" %}

Вызов нового API отличается добавлением параметра `/api/` в запросе:

`https://{адрес_установки}/rest/api/{id_пользователя}/{токен_вебхука}/catalog.roundingrule.update`

{% endnote %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3,"fields":{"roundType":4,"roundPrecision":100}}' \
    https://**put_your_bitrix24_address**/rest/api/**put_your_user_id_here**/**put_your_webhook_here**/catalog.roundingrule.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":3,"fields":{"roundType":4,"roundPrecision":100},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/api/catalog.roundingrule.update
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type RoundingRule = {
      id: number
      catalogGroupId: number
      price: number
      roundType: 1 | 2 | 4
      roundPrecision: number
      createdBy: number
      dateCreate: ISODate
      modifiedBy: number
      dateModify: ISODate
    }

    type RoundingRuleUpdateResult = {
      item: RoundingRule
    }

    try {
      const response = await $b24.actions.v3.call.make<RoundingRuleUpdateResult>({
        method: 'catalog.roundingrule.update',
        params: {
          id: 3,
          fields: {
            roundType: 4,
            roundPrecision: 100,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Rounding rule updated:', result.item.id)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function updateRoundingRule() {
        try {
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v3.call.make({
            method: 'catalog.roundingrule.update',
            params: {
              id: 3,
              fields: {
                roundType: 4,
                roundPrecision: 100,
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Rounding rule updated:', result.item.id)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateRoundingRule)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.catalog.roundingrule.update(
            bitrix_id=3,
            fields={
                "roundType": 4,
                "roundPrecision": 100,
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

    SDK пока не поддерживает вызовы по адресу `/rest/api/`. Используйте прямой HTTP-запрос, например через cURL или fetch.

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.roundingrule.update',
                [
                    'id' => 3,
                    'fields' => [
                        'roundType' => 4,
                        'roundPrecision' => 100,
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
        'catalog.roundingrule.update',
        {
            id: 3,
            fields: {
                roundType: 4,
                roundPrecision: 100,
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
        'catalog.roundingrule.update',
        [
            'id' => 3,
            'fields' => [
                'roundType' => 4,
                'roundPrecision' => 100,
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
    res, err := client.Core().Call(ctx, "catalog.roundingrule.update", b24.Params{
    	"id":     3,
    	"fields": b24.Params{
    		"roundType":      4,
    		"roundPrecision": 100,
    	},
    })
    if err != nil {
    	return fmt.Errorf("catalog.roundingrule.update: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "item".
    raw, ok := b24.Unwrap(res.Result, "item")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа item")
    }

    var item struct {
    	ID             int     `json:"id"`
    	CatalogGroupID int     `json:"catalogGroupId"`
    	Price          float64 `json:"price"`
    	RoundType      int     `json:"roundType"`
    	RoundPrecision float64 `json:"roundPrecision"`
    }
    if err := json.Unmarshal(raw, &item); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println(item.ID, item.RoundType, item.RoundPrecision)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "item": {
            "id": 3,
            "catalogGroupId": 25,
            "price": 1000,
            "roundType": 4,
            "roundPrecision": 100,
            "createdBy": 1,
            "dateCreate": "2026-10-22T14:20:16+03:00",
            "modifiedBy": 1,
            "dateModify": "2026-10-22T14:20:36+03:00"
        }
    },
    "time": {
        "start": 1792668036,
        "finish": 1792668036.056195,
        "duration": 0.05619502067565918,
        "processing": 0,
        "date_start": "2026-10-22T14:20:36+03:00",
        "date_finish": "2026-10-22T14:20:36+03:00",
        "operating_reset_at": 1792668600,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект с данными ответа ||
|| **result.item**
[`object`](../../data-types.md) | Поля правила округления после изменения. [Описание полей](#item) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект item {#item}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор правила округления ||
|| **catalogGroupId**
[`integer`](../../data-types.md) | Идентификатор типа цены, для которого действует правило ||
|| **price**
[`double`](../../data-types.md) | Минимальная цена, начиная с которой применяется правило. `0` — правило для всех цен типа ||
|| **roundType**
[`integer`](../../data-types.md) | Тип округления: `1` — математическое, `2` — в большую сторону, `4` — в меньшую сторону ||
|| **roundPrecision**
[`double`](../../data-types.md) | Точность округления, например `10` — до десятков ||
|| **createdBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который создал правило ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата и время создания правила ||
|| **modifiedBy**
[`integer`](../../data-types.md) | Идентификатор пользователя, который последним изменил правило ||
|| **dateModify**
[`datetime`](../../data-types.md) | Дата и время последнего изменения правила ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": {
        "code": "BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION",
        "message": "Запись с ID = `999999` не найдена"
    }
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info-v3.md) %}

### Возможные коды ошибок

#### Ошибки валидации запроса

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Не заполнено значение хотя бы одного обязательного поля: id, filter | Передайте `id` правила округления. Вместе с этим сообщением приходит второе: «Должно быть передано только одно из значений: id, filter» ||
|| `fields` | Обязательное поле `fields` не указано | Передайте объект `fields` ||
|| `catalogGroupId` | The specified price type does not exist | Передайте идентификатор существующего типа цены. Получить его можно методом [catalog.pricetype.list](../price-type/catalog-price-type-list-rest-v3.md) ||
|| `catalogGroupId` | В поле `catalogGroupId` требуется тип данных `int` для такого запроса | Передайте целое число ||
|| `price` | The rounding rule price threshold cannot be negative | Передайте в `price` число от `0` и больше ||
|| `price` | A rounding rule with the same price threshold already exists for this price type | Измените `price` или обновите существующее правило методом [catalog.roundingrule.update](./catalog-rounding-rule-update-rest-v3.md) ||
|| `roundType` | Invalid rounding type provided. The available values are: 1, 2, 4 | Передайте `1`, `2` или `4` ||
|| `roundPrecision` | Invalid rounding precision provided. The available values are: 0.0001, 0.001, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000 | Передайте одно из значений из списка ||
|#

#### Ошибки валидации объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_VALIDATION_DTOVALIDATIONEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `#FIELD#` | Поле "#FIELD#" не доступно к заполнению | Уберите из `fields` поля только для чтения: `id`, `createdBy`, `dateCreate`, `modifiedBy`, `dateModify` ||
|#

#### Ошибка формата фильтра

Код ошибки: `BITRIX_REST_V3_EXCEPTION_INVALIDFILTEREXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `filter` | Не удается распознать выражение фильтра `filter` | Метод не поддерживает `filter`. Передайте `id` правила округления ||
|#

#### Ошибка отсутствия объекта

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `id` | Запись с ID = `#ID#` не найдена | Правила округления с таким идентификатором нет. Проверьте идентификатор методом [catalog.roundingrule.list](./catalog-rounding-rule-list-rest-v3.md) ||
|#

#### Ошибка неизвестного поля

Код ошибки: `BITRIX_REST_V3_EXCEPTION_UNKNOWNDTOPROPERTYEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Неизвестное поле `#FIELD#` для сущности `RoundingRuleDto` | Передайте в `fields` только `catalogGroupId`, `price`, `roundType`, `roundPrecision` ||
|#

#### Ошибка доступа

Код ошибки: `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`

#|
|| **Поле** | **Описание ошибки** | **Как исправить** ||
|| `-` | Доступ запрещен | Проверьте, что у пользователя есть право «Управление типами цен» ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-rounding-rule-add-rest-v3.md)
- [{#T}](./catalog-rounding-rule-get-rest-v3.md)
- [{#T}](./catalog-rounding-rule-list-rest-v3.md)
- [{#T}](./catalog-rounding-rule-delete-rest-v3.md)
- [{#T}](./catalog-rounding-rule-field-list.md)
