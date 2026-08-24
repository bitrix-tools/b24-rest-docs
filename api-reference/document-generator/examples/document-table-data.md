# Сгенерировать документ с табличными данными

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

Табличные данные для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) как массив строк в `values`. В `fields` нужно описать провайдер таблицы, чтобы генератор обработал массив как повторяющиеся строки.

## Когда использовать

- Нужно заполнить одну таблицу строками одинаковой структуры
- Каждая строка таблицы содержит один и тот же набор значений, например название, цену и изображение
- Нужно вывести номер строки внутри таблицы

## Что передавать в запросе

- Обязательные параметры запроса — `templateId` и `value`: идентификатор шаблона и внешний идентификатор объекта, для которого создается документ
- В `fields['Table']['PROVIDER']` укажите `Bitrix\DocumentGenerator\DataProvider\ArrayDataProvider`, чтобы генератор обработал `values['Table']` как список строк таблицы
- В `fields['Table']['OPTIONS']` укажите:
  - `ITEM_NAME` — внутреннее имя элемента массива
  - `ITEM_PROVIDER` — `Bitrix\DocumentGenerator\DataProvider\HashDataProvider`
- В `values['Table']` передайте список строк таблицы
- Для плейсхолдеров таблицы, например `TableItemName` и `TableItemPrice`, передайте цепочку доступа к данным: `Table.Item.Name`, `Table.Item.Price`
- Для изображений в таблице укажите `TYPE = IMAGE` в `fields`
- Для номера строки можно использовать `Table.INDEX`

## Пример

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"templateId":203,"value":"ORDER_1024","values":{"Table":[{"Name":"Item name 1","Price":"$111.23","Image":"https://myrestapp.example/upload/product-1.png"},{"Name":"Item name 2","Price":"$222.34","Image":"https://myrestapp.example/upload/product-2.png"}],"TableItemName":"Table.Item.Name","TableItemImage":"Table.Item.Image","TableItemPrice":"Table.Item.Price","TableIndex":"Table.INDEX"},"fields":{"Table":{"PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider","OPTIONS":{"ITEM_NAME":"Item","ITEM_PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider"}},"TableItemImage":{"TYPE":"IMAGE"}}}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/documentgenerator.document.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    type DocumentAddResult = {
      document: {
        id: number
        downloadUrl: string
      }
    }

    const response = await $b24.actions.v2.call.make<DocumentAddResult>({
      method: 'documentgenerator.document.add',
      params: {
        templateId: 203,
        value: 'ORDER_1024',
        values: {
          Table: [
            {
              Name: 'Item name 1',
              Price: '$111.23',
              Image: 'https://myrestapp.example/upload/product-1.png',
            },
            {
              Name: 'Item name 2',
              Price: '$222.34',
              Image: 'https://myrestapp.example/upload/product-2.png',
            },
          ],
          TableItemName: 'Table.Item.Name',
          TableItemImage: 'Table.Item.Image',
          TableItemPrice: 'Table.Item.Price',
          TableIndex: 'Table.INDEX',
        },
        fields: {
          Table: {
            PROVIDER: 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
            OPTIONS: {
              ITEM_NAME: 'Item',
              ITEM_PROVIDER: 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
            },
          },
          TableItemImage: { TYPE: 'IMAGE' },
        },
      },
      requestId: Text.getUuidRfc4122()
    })

    if (!response.isSuccess) {
      console.error(response.getErrorMessages().join('; '))
    } else {
      console.info('Created document id:', response.getData()!.result.document.id)
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'documentgenerator.document.add',
            [
                'templateId' => 203,
                'value' => 'ORDER_1024',
                'values' => [
                    'Table' => [
                        [
                            'Name' => 'Item name 1',
                            'Price' => '$111.23',
                            'Image' => 'https://myrestapp.example/upload/product-1.png',
                        ],
                        [
                            'Name' => 'Item name 2',
                            'Price' => '$222.34',
                            'Image' => 'https://myrestapp.example/upload/product-2.png',
                        ],
                    ],
                    'TableItemName' => 'Table.Item.Name',
                    'TableItemImage' => 'Table.Item.Image',
                    'TableItemPrice' => 'Table.Item.Price',
                    'TableIndex' => 'Table.INDEX',
                ],
                'fields' => [
                    'Table' => [
                        'PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider',
                        'OPTIONS' => [
                            'ITEM_NAME' => 'Item',
                            'ITEM_PROVIDER' => 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider',
                        ],
                    ],
                    'TableItemImage' => ['TYPE' => 'IMAGE'],
                ],
            ]
        );

        $result = $response->getResponseData()->getResult();
        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

{% endlist %}

## Как это работает

В примере предполагается, что в шаблоне есть таблица с полями `{TableItemName}`, `{TableItemImage}`, `{TableItemPrice}`.

1. Поле `Table` используется как контейнер массива строк. Такого плейсхолдера может не быть в шаблоне, но он нужен, чтобы передать массив значений для таблицы
2. По `ITEM_NAME = Item` провайдер читает каждый элемент строки как объект `Item`
3. По `ITEM_PROVIDER = HashDataProvider` элементы читаются как плоский ассоциативный массив
4. Поля вида `TableItem...` ссылаются на значения через цепочку `Table.Item.<Ключ>`, где `<Ключ>` — ключ внутреннего ассоциативного массива, например `Name`, `Price` или `Image`

`Table.INDEX` возвращает номер текущей строки, начиная с `1`.

Если указать в качестве значения поля обычную строку, то она вставится в таблицу как есть во все строки.

## Что вернется

Метод возвращает данные созданного документа. Пример ответа сокращен, полное описание полей — на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

```json
{
    "result": {
        "document": {
            "id": 51,
            "title": "ORDER Template 51",
            "templateId": "203",
            "value": "ORDER_1024",
            "isTransformationError": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068"
        }
    }
}
```

Ответ не содержит развернутых строк таблицы: он подтверждает только создание документа. Результат подстановки проверяйте в самом файле.

## Проверим результат

1. Скачайте файл по `downloadUrl` из ответа
2. Убедитесь, что таблица содержит столько строк, сколько элементов передано в `values['Table']`
3. Проверьте нумерацию строк, если в шаблоне используется плейсхолдер с `Table.INDEX`

## Если метод вернул ошибку

- `Empty required parameter "value"` — не передан обязательный параметр `value`
- `Шаблон не найден` — шаблона с указанным `templateId` не существует

В таблице одна строка вместо нескольких — в `fields['Table']['PROVIDER']` не указан `ArrayDataProvider`, поэтому массив обработан как обычное значение.

В ячейках выводятся строки вида `Table.Item.Name` — цепочка доступа не совпала с `ITEM_NAME` или коды полей не совпали с плейсхолдерами шаблона.

Полный список ошибок — в разделе «Обработка ошибок» на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
