# Галереи

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Для галереи используется стандартная разметка карточек и нод изображений. В [манифесте блока](../manifest.md) подключите расширение `landing_gallery_cards`.

## Как настроить галерею

Минимальный вариант:

```php
'assets' => [
    'ext' => ['landing_gallery_cards'],
],
```

```html
<div class="js-gallery-cards">
    <img class="landing-block-node-card-img" src="/upload/gallery-1.jpg" data-fancybox="gallery" alt="">
</div>
```

## Что делает расширение gallery

Расширение `landing_gallery_cards` подготавливает изображения внутри `js-gallery-cards` к просмотру в режиме галереи и создает кликабельную обертку `<a>` вокруг изображения. При открытии используется изображение из `src`. Если у ноды есть `srcset`, оно также передается в настройки просмотра.

## Разметка галереи

Корневой контейнер галереи должен иметь класс `js-gallery-cards`.

Внутри контейнера размещаются изображения нод типа `img`. Для каждого изображения задайте:

- `data-fancybox` — признак участия в галерее
- `src` — источник изображения, который будет открываться при клике

Опционально:

- `data-link-classes` — классы, которые добавляются к ссылке-обертке вокруг изображения, например `d-block g-pos-rel`

Пример:

```html
<div class="js-gallery-cards row">
    <div class="landing-block-node-card col-lg-3 col-md-4 col-sm-6 g-mb-30">
        <img
            class="landing-block-node-card-img g-max-width-100x g-max-height-350"
            src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img1.jpg"
            data-fancybox="gallery"
            data-link-classes="d-block g-pos-rel"
            alt="">
    </div>

    <div class="landing-block-node-card col-lg-3 col-md-4 col-sm-6 g-mb-30">
        <img
            class="landing-block-node-card-img g-max-width-100x g-max-height-350"
            src="https://cdn.bitrix24.site/bitrix/images/landing/business/270x481/img2.jpg"
            data-fancybox="gallery"
            data-link-classes="d-block g-pos-rel"
            alt="">
    </div>
</div>
```

## Совмещение с каруселью

Галерею можно использовать вместе со слайдером. В этом случае важно подключать расширения в порядке:

1. `landing_carousel`
2. `landing_gallery_cards`

```php
'assets' => [
    'ext' => ['landing_carousel', 'landing_gallery_cards'],
],
```

## Что важно учитывать

- у изображения должен быть задан `src`, иначе ссылка-обертка не создается
- для участия изображения в галерее у ноды должен быть атрибут `data-fancybox`
- в базовом сценарии галерея открывает изображение из `src`, отдельное поле для пары миниатюра/полная версия не используется
- `data-link-classes` применяется к созданной ссылке-обертке вокруг изображения
- при совместном использовании со слайдером сначала подключается `landing_carousel`, затем `landing_gallery_cards`

## Продолжите изучение

- [Слайдеры](./sliders.md)
- [Счетчики обратного отсчета](./timer.md)
- [Файл манифеста блока](../manifest.md)
- [Типы нод](../node-types.md)
