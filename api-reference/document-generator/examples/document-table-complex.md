# Сгенерировать документ со сложными таблицами

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

В REST генератора документов можно заполнять плейсхолдеры шаблона вложенными списками, когда одно из значений списка первого уровня содержит еще один список. Для создания документа используется метод [documentgenerator.document.add](../document-generator-document-add.md).

## Когда использовать

- Нужно вставить несколько таблиц одинаковой структуры, но с разным числом строк
- Нужно построить таблицу внутри повторяющегося блока

В таких сценариях внешний список задает структуру, а внутренние списки передаются отдельными полями и связываются через цепочки вида `Events.Event.Title` и `Event1Speakers.Speaker.Name`.

## Что передавать в запросе

- Обязательные параметры запроса — `templateId` и `value`: идентификатор шаблона и внешний идентификатор объекта, для которого создается документ
- В `values` передайте внешний список, например `Events`
- В элементах внешнего списка передайте плейсхолдеры для связанных внутренних списков, например `{Event1SpeakersSpeakerName}`
- Для полей внешнего списка передайте цепочки доступа вида `Events.Event.Title`
- Для каждого внутреннего списка передайте отдельный массив в `values`, например `Event1Speakers`
- Для полей внутренних списков передайте цепочки доступа вида `Event1Speakers.Speaker.Name`
- В `fields` опишите внешний и внутренние списки через `ArrayDataProvider`
- В `OPTIONS` каждого списка укажите `ITEM_NAME` и `ITEM_PROVIDER` = `Bitrix\DocumentGenerator\DataProvider\HashDataProvider`

## На что обратить внимание

- В `fields` внешний список должен идти раньше связанных внутренних списков, чтобы провайдеры разрешались в нужном порядке
- Коды внутренних списков должны совпадать с плейсхолдерами, которые передаются во внешнем списке

## Пример

В примере создается документ с блоком мероприятий, внутри каждого мероприятия — своя таблица спикеров.

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"templateId":203,"value":"EVENTS_2026","values":{"Title":"Welcome to my template","Description":"<b>Description is here</b>","Events":[{"Title":"Automation","Description":"Some description of the automation event","SpeakerName":"{Event1SpeakersSpeakerName}","SpeakerCompany":"{Event1SpeakersSpeakerCompany}","SpeakerPosition":"{Event1SpeakersSpeakerPosition}"},{"Title":"Documents","Description":"This event is about document processing","SpeakerName":"{Event2SpeakersSpeakerName}","SpeakerCompany":"{Event2SpeakersSpeakerCompany}","SpeakerPosition":"{Event2SpeakersSpeakerPosition}"}],"EventsEventTitle":"Events.Event.Title","EventsEventDescription":"Events.Event.Description","EventsEventSpeakerName":"Events.Event.SpeakerName","EventsEventSpeakerCompany":"Events.Event.SpeakerCompany","EventsEventSpeakerPosition":"Events.Event.SpeakerPosition","Event1Speakers":[{"Name":"Ivan Petrov","Company":"Cool Ltd.","Position":"Core developer"},{"Name":"Igor Milov","Company":"Cool Ltd.","Position":"Product Manager"}],"Event1SpeakersSpeakerName":"Event1Speakers.Speaker.Name","Event1SpeakersSpeakerCompany":"Event1Speakers.Speaker.Company","Event1SpeakersSpeakerPosition":"Event1Speakers.Speaker.Position","Event2Speakers":[{"Name":"Sergey Ivanov","Company":"Devils corp.","Position":"Chief"}],"Event2SpeakersSpeakerName":"Event2Speakers.Speaker.Name","Event2SpeakersSpeakerCompany":"Event2Speakers.Speaker.Company","Event2SpeakersSpeakerPosition":"Event2Speakers.Speaker.Position"},"fields":{"Events":{"PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider","OPTIONS":{"ITEM_NAME":"Event","ITEM_PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider"}},"Event1Speakers":{"PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider","OPTIONS":{"ITEM_NAME":"Speaker","ITEM_PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider"}},"Event2Speakers":{"PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider","OPTIONS":{"ITEM_NAME":"Speaker","ITEM_PROVIDER":"Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider"}}}}' \
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

    const arrayProvider = 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider'
    const hashProvider = 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider'

    const response = await $b24.actions.v2.call.make<DocumentAddResult>({
      method: 'documentgenerator.document.add',
      params: {
        templateId: 203,
        value: 'EVENTS_2026',
        values: {
          Title: 'Welcome to my template',
          Description: '<b>Description is here</b>',
          // the outer list: each item carries placeholders of its own speakers table
          Events: [
            {
              Title: 'Automation',
              Description: 'Some description of the automation event',
              SpeakerName: '{Event1SpeakersSpeakerName}',
              SpeakerCompany: '{Event1SpeakersSpeakerCompany}',
              SpeakerPosition: '{Event1SpeakersSpeakerPosition}',
            },
            {
              Title: 'Documents',
              Description: 'This event is about document processing',
              SpeakerName: '{Event2SpeakersSpeakerName}',
              SpeakerCompany: '{Event2SpeakersSpeakerCompany}',
              SpeakerPosition: '{Event2SpeakersSpeakerPosition}',
            },
          ],
          EventsEventTitle: 'Events.Event.Title',
          EventsEventDescription: 'Events.Event.Description',
          EventsEventSpeakerName: 'Events.Event.SpeakerName',
          EventsEventSpeakerCompany: 'Events.Event.SpeakerCompany',
          EventsEventSpeakerPosition: 'Events.Event.SpeakerPosition',
          // the inner lists are passed as separate fields
          Event1Speakers: [
            { Name: 'Ivan Petrov', Company: 'Cool Ltd.', Position: 'Core developer' },
            { Name: 'Igor Milov', Company: 'Cool Ltd.', Position: 'Product Manager' },
          ],
          Event1SpeakersSpeakerName: 'Event1Speakers.Speaker.Name',
          Event1SpeakersSpeakerCompany: 'Event1Speakers.Speaker.Company',
          Event1SpeakersSpeakerPosition: 'Event1Speakers.Speaker.Position',
          Event2Speakers: [
            { Name: 'Sergey Ivanov', Company: 'Devils corp.', Position: 'Chief' },
          ],
          Event2SpeakersSpeakerName: 'Event2Speakers.Speaker.Name',
          Event2SpeakersSpeakerCompany: 'Event2Speakers.Speaker.Company',
          Event2SpeakersSpeakerPosition: 'Event2Speakers.Speaker.Position',
        },
        fields: {
          Events: {
            PROVIDER: arrayProvider,
            OPTIONS: { ITEM_NAME: 'Event', ITEM_PROVIDER: hashProvider },
          },
          Event1Speakers: {
            PROVIDER: arrayProvider,
            OPTIONS: { ITEM_NAME: 'Speaker', ITEM_PROVIDER: hashProvider },
          },
          Event2Speakers: {
            PROVIDER: arrayProvider,
            OPTIONS: { ITEM_NAME: 'Speaker', ITEM_PROVIDER: hashProvider },
          },
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
        $arrayProvider = 'Bitrix\\DocumentGenerator\\DataProvider\\ArrayDataProvider';
        $hashProvider = 'Bitrix\\DocumentGenerator\\DataProvider\\HashDataProvider';

        $response = $b24Service->core->call(
            'documentgenerator.document.add',
            [
                'templateId' => 203,
                'value' => 'EVENTS_2026',
                'values' => [
                    'Title' => 'Welcome to my template',
                    'Description' => '<b>Description is here</b>',
                    // внешний список: каждый элемент несет плейсхолдеры своей таблицы спикеров
                    'Events' => [
                        [
                            'Title' => 'Automation',
                            'Description' => 'Some description of the automation event',
                            'SpeakerName' => '{Event1SpeakersSpeakerName}',
                            'SpeakerCompany' => '{Event1SpeakersSpeakerCompany}',
                            'SpeakerPosition' => '{Event1SpeakersSpeakerPosition}',
                        ],
                        [
                            'Title' => 'Documents',
                            'Description' => 'This event is about document processing',
                            'SpeakerName' => '{Event2SpeakersSpeakerName}',
                            'SpeakerCompany' => '{Event2SpeakersSpeakerCompany}',
                            'SpeakerPosition' => '{Event2SpeakersSpeakerPosition}',
                        ],
                    ],
                    'EventsEventTitle' => 'Events.Event.Title',
                    'EventsEventDescription' => 'Events.Event.Description',
                    'EventsEventSpeakerName' => 'Events.Event.SpeakerName',
                    'EventsEventSpeakerCompany' => 'Events.Event.SpeakerCompany',
                    'EventsEventSpeakerPosition' => 'Events.Event.SpeakerPosition',
                    // внутренние списки передаются отдельными полями
                    'Event1Speakers' => [
                        [
                            'Name' => 'Ivan Petrov',
                            'Company' => 'Cool Ltd.',
                            'Position' => 'Core developer',
                        ],
                        [
                            'Name' => 'Igor Milov',
                            'Company' => 'Cool Ltd.',
                            'Position' => 'Product Manager',
                        ],
                    ],
                    'Event1SpeakersSpeakerName' => 'Event1Speakers.Speaker.Name',
                    'Event1SpeakersSpeakerCompany' => 'Event1Speakers.Speaker.Company',
                    'Event1SpeakersSpeakerPosition' => 'Event1Speakers.Speaker.Position',
                    'Event2Speakers' => [
                        [
                            'Name' => 'Sergey Ivanov',
                            'Company' => 'Devils corp.',
                            'Position' => 'Chief',
                        ],
                    ],
                    'Event2SpeakersSpeakerName' => 'Event2Speakers.Speaker.Name',
                    'Event2SpeakersSpeakerCompany' => 'Event2Speakers.Speaker.Company',
                    'Event2SpeakersSpeakerPosition' => 'Event2Speakers.Speaker.Position',
                ],
                'fields' => [
                    'Events' => [
                        'PROVIDER' => $arrayProvider,
                        'OPTIONS' => [
                            'ITEM_NAME' => 'Event',
                            'ITEM_PROVIDER' => $hashProvider,
                        ],
                    ],
                    'Event1Speakers' => [
                        'PROVIDER' => $arrayProvider,
                        'OPTIONS' => [
                            'ITEM_NAME' => 'Speaker',
                            'ITEM_PROVIDER' => $hashProvider,
                        ],
                    ],
                    'Event2Speakers' => [
                        'PROVIDER' => $arrayProvider,
                        'OPTIONS' => [
                            'ITEM_NAME' => 'Speaker',
                            'ITEM_PROVIDER' => $hashProvider,
                        ],
                    ],
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

## Что вернется

Метод возвращает данные созданного документа. Пример ответа сокращен, полное описание полей — на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

```json
{
    "result": {
        "document": {
            "id": 51,
            "title": "EVENTS Template 51",
            "templateId": "203",
            "value": "EVENTS_2026",
            "isTransformationError": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068"
        }
    }
}
```

Ответ подтверждает только создание документа. Развернутые вложенные списки в нем не возвращаются, поэтому результат подстановки проверяйте в самом файле.

## Проверим результат

1. Скачайте файл по `downloadUrl` из ответа
2. Убедитесь, что повторяющийся блок построен по числу элементов внешнего списка `Events`
3. Проверьте, что внутри каждого блока таблица спикеров содержит строки своего внутреннего списка, а не общий набор

## Если метод вернул ошибку

- `Empty required parameter "value"` — не передан обязательный параметр `value`
- `Шаблон не найден` — шаблона с указанным `templateId` не существует

Во всех блоках выводится один и тот же список спикеров — коды внутренних списков не совпали с плейсхолдерами, которые переданы в элементах внешнего списка.

Внутренние таблицы остались пустыми — в `fields` внутренний список описан раньше внешнего или для него не указан `ArrayDataProvider`.

Полный список ошибок — в разделе «Обработка ошибок» на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
