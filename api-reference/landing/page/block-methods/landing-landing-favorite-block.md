# Добавление блока в Мои блоки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы (1 ссылка)

{% endnote %}

{% endif %}

{% note info "landing.landing.favoriteBlock" %}

**Scope**: [`landing`](../../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `landing.landing.favoriteBlock` сохраняет имеющийся на странице блок в «Мои блоки». Возвращает идентификатор нового сохраненного блока.

{% note info %}

Метод может пригодиться при удалении блока из сохраненных.

{% endnote %}

## Параметры

#|
|| **Метод** | **Описание** ||
|| **lid**
[`unknown`](../../../data-types.md) | Идентификатор страницы. ||
|| **block**
[`unknown`](../../../data-types.md) | Идентификатор блока. ||
|| **meta**
[`unknown`](../../../data-types.md) | Объект информации для сохранения блока. Содержит поля:
- **name** – название блока;
- **section** – массив [категорий](../../block/manifest.md), куда сохранить блок;
- **preview** – изображение блока. ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'landing.landing.favoriteBlock',
        {
            lid: 11262,
            block: 81827,
            meta: {
                name: 'Мой блок',
                section: ['text', 'text_image'],
                preview: 'https://mycdn.com/pic/1.jpg'
            }
        },
        function(result)
        {
            if(result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../../../_includes/examples.md) %}