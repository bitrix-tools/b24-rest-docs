# Сгенерировать документ с текстом

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

Текстовые значения для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) через параметр `values` без дополнительных настроек типов полей.

## Когда использовать

- В шаблоне только текстовые плейсхолдеры без модификаторов типов
- Не нужно задавать `TYPE`, `FORMAT` и провайдеры в `fields`

## Что передавать в запросе

- `templateId` — идентификатор шаблона, по которому создается документ
- `value` — внешний идентификатор объекта, для которого создается документ
- `values` — объект вида `"КодПоля": "ТекстовоеЗначение"`
- `fields` можно не передавать, если все поля вставляются как обычный текст без форматирования

Ключи в `values` должны совпадать с кодами полей из шаблона, например для плейсхолдера `{SomeName}` нужно передать `'SomeName'`.

Получить коды полей шаблона можно методом [documentgenerator.template.getfields](../templates/document-generator-template-get-fields.md).

Провайдер данных `Bitrix\DocumentGenerator\DataProvider\Rest` подставляется автоматически, поэтому `providerClassName` можно не передавать.

## Пример

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"templateId":203,"value":"ORDER_1024","values":{"DocumentNumber":"ДГ-2026-001","CurrentDate":"18.03.2026","ClientName":"ООО Ромашка","Comment":"Оплата в течение 5 рабочих дней после подписания"}}' \
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
        title: string
        downloadUrl: string
      }
    }

    const response = await $b24.actions.v2.call.make<DocumentAddResult>({
      method: 'documentgenerator.document.add',
      params: {
        templateId: 203,
        value: 'ORDER_1024',
        values: {
          DocumentNumber: 'DG-2026-001',
          CurrentDate: '18.03.2026',
          ClientName: 'Romashka LLC',
          Comment: 'Payment within 5 business days after signing',
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
                    'DocumentNumber' => 'ДГ-2026-001',
                    'CurrentDate' => '18.03.2026',
                    'ClientName' => 'ООО Ромашка',
                    'Comment' => 'Оплата в течение 5 рабочих дней после подписания',
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
            "title": "ORDER Template ДГ-2026-001",
            "number": "ДГ-2026-001",
            "templateId": "203",
            "value": "ORDER_1024",
            "isTransformationError": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068",
            "publicUrl": null
        }
    }
}
```

Что взять из ответа:

- `id` — идентификатор документа для дальнейших вызовов
- `downloadUrl` — ссылка на скачивание DOCX для пользователя, `downloadUrlMachine` — та же ссылка для приложения
- `publicUrl` — публичная ссылка, она равна `null`, пока не включена методом [documentgenerator.document.enablepublicurl](../document-generator-document-enable-public-url.md)

## Проверим результат

1. Получите документ методом [documentgenerator.document.get](../document-generator-document-get.md) по `id` из ответа
2. Скачайте файл по `downloadUrl` и убедитесь, что в тексте документа вместо плейсхолдеров подставились переданные значения
3. Если нужен PDF, проверьте поле `pdfUrl` в ответе метода [documentgenerator.document.get](../document-generator-document-get.md). Конвертация выполняется асинхронно, поэтому поле заполняется не сразу

## Если метод вернул ошибку

- `Empty required parameter "value"` — не передан обязательный параметр `value`
- `Шаблон не найден` — шаблона с указанным `templateId` не существует
- `Cannot create document on deleted template` — шаблон помечен как удаленный, создайте документ по другому шаблону

Документ создался, но поля пустые — коды в `values` не совпали с плейсхолдерами шаблона. Сверьте их с ответом метода [documentgenerator.template.getfields](../templates/document-generator-template-get-fields.md).

Полный список ошибок — в разделе «Обработка ошибок» на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

## Продолжите изучение

- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./document-images-seals.md)
- [{#T}](./index.md)
