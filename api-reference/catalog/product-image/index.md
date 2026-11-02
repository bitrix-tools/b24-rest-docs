# Изображения товаров и вариаций в Торговом каталоге: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В товары и вариации можно добавлять разные типы изображений:

- `DETAIL_PICTURE` — детальное изображение, поле доступно в старой карточке товара
- `PREVIEW_PICTURE` — изображение для анонса, поле доступно в старой карточке товара
- `MORE_PHOTO` — дополнительные изображения

> Быстрый переход: [все методы](#all-methods)

## Как добавить изображение в созданный товар

Чтобы добавить или заменить изображение созданного товара, используйте метод [catalog.productImage.add](./catalog-product-image-add.md). Укажите тип изображения и передайте в параметре `fileContent` массив из двух элементов:

- название файла изображения с его расширением
- файл в кодировке Base64

Если не указать тип изображения, оно будет сохранено как дополнительное изображение `MORE_PHOTO`. Изображения типов `PREVIEW_PICTURE` и `DETAIL_PICTURE` заменяют текущие.

## Как добавить изображение при создании товара

Используйте метод [catalog.product.add](../product/catalog-product-add.md) и передайте в параметры `previewPicture` или `detailPicture` объект в формате `{fileData: [value1, value2]}`:

- `value1` — название файла изображения с его расширением
- `value2` — файл в кодировке base64

{% note tip "Частые кейсы и сценарии" %}

- [Как загрузить файлы](../../files/how-to-upload-files.md)

{% endnote %}

## Как начать работу

1. Получите идентификатор товара или вариации методами из раздела [Связь изображений с другими объектами](#links)
2. Добавьте изображение методом [catalog.productImage.add](./catalog-product-image-add.md) или [catalog.product.image.add](./catalog-product-image-add-rest-v3.md)
3. Получите изображения товара и их идентификаторы методом [catalog.productImage.list](./catalog-product-image-list.md) или [catalog.product.image.list](./catalog-product-image-list-rest-v3.md)
4. Удалите ненужное изображение методом [catalog.productImage.delete](./catalog-product-image-delete.md) или [catalog.product.image.delete](./catalog-product-image-delete-rest-v3.md)

## Ограничения и особенности

- Тип файла проверяется по расширению в названии. Допустимые расширения: `jpg`, `jpeg`, `jpe`, `png`, `gif`, `bmp`, `webp`
- Размер файла ограничен настройками Битрикс24 и свободным местом на диске
- Дополнительные изображения `MORE_PHOTO` хранятся в свойстве товара с кодом `MORE_PHOTO` типа «Файл». Если свойства нет или оно неактивно, добавить дополнительное изображение нельзя
- Методы `get` и `delete` работают, только если изображение относится к товару из `productId`
- В методах прежней версии API ссылка `downloadUrl` подписана токеном запроса. Не передавайте ее третьим лицам: по ссылке можно восстановить данные авторизации

## Связь изображений товаров и вариаций с другими объектами {#links}

**Товары.** Укажите идентификатор товара, для которого хотите добавить изображение. Список идентификаторов можно получить методами:

- [catalog.product.list](../product/catalog-product-list.md) — для простых товаров
- [catalog.product.service.list](../product/service/catalog-product-service-list.md) — для услуг
- [catalog.product.sku.list](../product/sku/catalog-product-sku-list.md) — для головных товаров у товаров с вариациями
- [catalog.product.offer.list](../product/offer/catalog-product-offer-list.md) — для вариаций товаров

## Изображения в REST 3.0

В [REST 3.0](../../rest-v3.md) для изображений есть методы добавления, получения, удаления и методы получения схемы полей `catalog.product.image.field.list` и `catalog.product.image.field.get`. Методы, которые есть в обеих версиях API, помечены в таблице как `v 3.0`.

Какую версию выбрать: REST 3.0 принимает файл по ссылке `url` и возвращает ошибки с кодом и полем, прежняя версия позволяет не указывать тип изображения.

Особенности методов новой версии:

- методы [catalog.product.image.get](./catalog-product-image-get-rest-v3.md) и [catalog.product.image.delete](./catalog-product-image-delete-rest-v3.md) требуют `id` изображения и `productId` товара, метод [catalog.product.image.list](./catalog-product-image-list-rest-v3.md) — фильтр по `productId`
- тип изображения `type` при добавлении обязателен
- файл передается в `fields.file.upload`: имя файла `name` и содержимое `data` в Base64 или ссылка `url`
- изображения типов `PREVIEW_PICTURE` и `DETAIL_PICTURE` заменяют прежние, изображение типа `MORE_PHOTO` добавляется к имеющимся
- идентификатор изображения совпадает с идентификатором файла
- кроме прав каталога, методы проверяют права пользователя на инфоблок каталога: на чтение, изменение или удаление товара

## Обзор методов {#all-methods}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять методы:
> - пользователь с правом «Просмотр каталога товаров» или «Просмотр товаров каталога» и правом на чтение товара — для получения изображений методами прежней версии API. Для добавления и удаления нужно право «Просмотр товаров каталога» и право на изменение товара
> - пользователь с правом «Просмотр каталога товаров», «Просмотр товаров каталога» или «Изменение цены продажи товара» и правом на чтение товара — для получения изображений в REST 3.0. Для добавления и удаления нужно право «Редактирование товара» и право на изменение товара

#|
|| **Метод** | **Описание** ||
|| [catalog.productImage.add](./catalog-product-image-add.md) | Добавляет изображение в товар или вариацию ||
|| [catalog.product.image.add](./catalog-product-image-add-rest-v3.md) | Добавляет изображение в товар или вариацию v 3.0 ||
|| [catalog.productImage.get](./catalog-product-image-get.md) | Возвращает информацию о конкретном изображении товара или вариации ||
|| [catalog.product.image.get](./catalog-product-image-get-rest-v3.md) | Возвращает информацию о конкретном изображении товара или вариации v 3.0 ||
|| [catalog.productImage.list](./catalog-product-image-list.md) | Возвращает список изображений товара или вариации ||
|| [catalog.product.image.list](./catalog-product-image-list-rest-v3.md) | Возвращает список изображений товара или вариации v 3.0 ||
|| [catalog.productImage.delete](./catalog-product-image-delete.md) | Удаляет изображение из товара или вариации ||
|| [catalog.product.image.delete](./catalog-product-image-delete-rest-v3.md) | Удаляет изображение из товара или вариации v 3.0 ||
|| [catalog.productImage.getFields](./catalog-product-image-get-fields.md) | Возвращает доступные поля изображения товара или вариации ||
|| [catalog.product.image.field.list](./catalog-product-image-field-list.md) | Возвращает список полей изображения товара v 3.0 ||
|| [catalog.product.image.field.get](./catalog-product-image-field-get.md) | Возвращает описание поля изображения товара ||
|#
