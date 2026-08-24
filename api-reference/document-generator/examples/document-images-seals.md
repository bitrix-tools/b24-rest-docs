# Сгенерировать документ с изображениями и печатями

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на создание документов

Изображения, печати и подписи для плейсхолдеров шаблона передаются в метод [documentgenerator.document.add](../document-generator-document-add.md) ссылками на файлы в `values`. Файлы скачиваются по указанному URL и вставляются в документ при генерации.

## Когда использовать

- Нужно вставить изображение по внешней ссылке
- Нужно добавить печать или подпись в поле шаблона

## Что передавать в запросе

- Обязательные параметры запроса — `templateId` и `value`: идентификатор шаблона и внешний идентификатор объекта, для которого создается документ
- В `values` передайте абсолютные URL файлов. URL файла должен быть доступен Битрикс24 без дополнительной авторизации
- В `fields` для кода поля укажите тип:
  - `IMAGE` — поле изображения
  - `STAMP` — поле печати или подписи
- Коды полей в `values` и `fields` должны совпадать с кодами плейсхолдеров в шаблоне

## Пример

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"templateId":203,"value":"ORDER_1024","stampsEnabled":1,"values":{"Stamp":"https://myrestapp.example/upload/stamp.png","Image":"https://myrestapp.example/upload/image.jpg"},"fields":{"Stamp":{"TYPE":"STAMP"},"Image":{"TYPE":"IMAGE"}}}' \
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
        stampsEnabled: boolean
        downloadUrl: string
      }
    }

    const response = await $b24.actions.v2.call.make<DocumentAddResult>({
      method: 'documentgenerator.document.add',
      params: {
        templateId: 203,
        value: 'ORDER_1024',
        stampsEnabled: 1,
        values: {
          // external link to the seal file
          Stamp: 'https://myrestapp.example/upload/stamp.png',
          // external link to the image file
          Image: 'https://myrestapp.example/upload/image.jpg',
        },
        fields: {
          Stamp: { TYPE: 'STAMP' },
          Image: { TYPE: 'IMAGE' },
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
                'stampsEnabled' => 1,
                'values' => [
                    // внешний путь к файлу печати
                    'Stamp' => 'https://myrestapp.example/upload/stamp.png',
                    // внешний путь к файлу изображения
                    'Image' => 'https://myrestapp.example/upload/image.jpg',
                ],
                'fields' => [
                    // тип поля — печать
                    'Stamp' => ['TYPE' => 'STAMP'],
                    // тип поля — изображение
                    'Image' => ['TYPE' => 'IMAGE'],
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

Параметр `stampsEnabled` управляет выводом полей типа `STAMP` в документе. Если его не передавать, применяется значение из шаблона.

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
            "stampsEnabled": true,
            "isTransformationError": false,
            "downloadUrl": "/bitrix/services/main/ajax.php?action=documentgenerator.api.document.getfile&SITE_ID=s1&id=51&ts=1773844068"
        }
    }
}
```

Поле `stampsEnabled` в ответе показывает, включены ли печати и подписи для созданного документа.

## Проверим результат

1. Скачайте файл по `downloadUrl` из ответа
2. Убедитесь, что изображение и печать вставились в нужные плейсхолдеры, а не остались текстовыми ссылками
3. Если поле осталось пустым, проверьте, что URL файла открывается без авторизации и отдает изображение

## Если метод вернул ошибку

- `Empty required parameter "value"` — не передан обязательный параметр `value`
- `Шаблон не найден` — шаблона с указанным `templateId` не существует

Вместо картинки в документе видна ссылка — в `fields` для этого поля не указан `TYPE` = `IMAGE` или `TYPE` = `STAMP`.

Печать не появилась — проверьте `stampsEnabled` в ответе. Если он `false`, передайте `stampsEnabled` = `1` в запросе или включите печати в шаблоне.

Полный список ошибок — в разделе «Обработка ошибок» на странице метода [documentgenerator.document.add](../document-generator-document-add.md).

## Продолжите изучение

- [{#T}](./document-text-data.md)
- [{#T}](./document-date-name.md)
- [{#T}](./document-table-data.md)
- [{#T}](./document-table-complex.md)
- [{#T}](./index.md)
