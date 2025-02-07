# Сущность Блоки

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

> Быстрый переход: [все методы](#all-methods) 

Блок это html-код, который сопровожден [файлом манифеста](./manifest.md). Вот пример такого простейшего блока:

```html
<section class="landing-block">
    <div class="text-center g-color-gray-dark-v3 g-pa-10">
        <div class="g-width-600 mx-auto">
            <div class="landing-block-node-text g-font-size-12 ">
                <p>&copy; 2017 All right reserved. Developed by
                <a href="#" class="landing-block-node-link g-color-primary">Bitrix24</a></p>
            </div>
        </div>
    </div>
</section>
```

Стоит помнить, что в момент вывода блоков (как в режиме редактирования, так и в режиме просмотра) он обрамляется в спец.обертку `<div id="anchor" class="block-wrapper block-code">...</div>`, где:

- **anchor** – якорь блока, если не изменен пользователем, то вида block123, где 123 id блока;
- **block-wrapper** – одинаковый класс для всех блоков;
- **block-code** – класс, зависящий от кода блока, где **code** является непосредственно кодом блока (приведенный к безопасному виду).

{% note warning %}

В режиме редактирования создаются копии всех блоков до их публикации. И обращение по ID к блокам надо делать ссылаясь на блоки именно чернового варианта.

{% endnote %}

Верстку новых блоков вы можете заказать у специалиста, или воспользоваться предложенными дополнительными блоками [вендора](https://htmlstream.com/preview/unify-v2.6/unify-main/shortcodes/index.html).

## Обзор методов {#all-methods}

#|
|| **Метод** | **Описание** | **С версии** ||
|| [landing.block.clonecard](./methods/landing-block-clone-card.md) | Метод для клонирования карточки блока. | ||
|| [landing.block.removecard](./methods/landing-block-remove-card.md) | Метод для удаления блока | ||
|| [landing.block.updatenodes](./methods/landing-block-update-nodes.md) | Метод для изменения контента блока. | ||
|| [landing.block.changeNodeName](./methods/landing-block-change-node-name.md) | Метод изменяет название тега. | ||
|| [landing.block.updateattrs](./methods/landing-block-update-attrs.md) | Метод для изменения атрибутов ноды блока. | ||
|| [landing.block.updateStyles](./methods/landing-block-update-styles.md) | Метод для изменения стилей блока. | ||
|| [landing.block.getcontent](./methods/landing-block-get-content.md) | Метод для получения контента блока. | ||
|| [landing.block.getlist](./methods/landing-block-get-list.md) | Метод для получение списка блоков страницы. | ||
|| [landing.block.getbyid](./methods/landing-block-get-by-id.md) | Метод для получения блока по его идентификатору. | ||
|| [landing.block.getmanifest](./methods/landing-block-get-manifest.md) | Метод для получения манифеста конкретного блока, уже размещенного на странице. | ||
|| [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) | Метод для получения манифеста блока из репозитория. | ||
|| [landing.block.getrepository](./methods/landing-block-get-repository.md) | Метод возвращает список блоков из репозитория. | ||
|| [landing.block.uploadfile](./methods/landing-block-upload-file.md) | Метод загружает картинку и привязывает ее к указанному блоку. | ||
|| [landing.block.updatecontent](./methods/landing-block-update-content.md) | Метод обновляет содержимое уже размещенного на странице блока на любой произвольный. | ||
|| [landing.block.addcard](./methods/landing-block-add-card.md) | Метод полностью повторяет работу [landing.block.clonecard](./methods/landing-block-clone-card.md) но дает возможность вставить карточку сразу с измененным контентом. | ||
|| [landing.block.updateCards](./methods/landing-block-update-cards.md) | Метод для массового изменения карточек блока. | ||
|| [landing.block.changeAnchor](./methods/landing-block-change-anchor.md) | Метод изменяет символьный код якоря. | ||
|| [landing.block.getContentFromRepository](./methods/landing-block-get-content-from-repository.md) | Метод получает контент блока из репозитория «как есть» до добавления блока на какую-либо страницу. | 18.7.500 ||
|#