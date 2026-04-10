# Специальные страницы сайта: обзор методов

В Битрикс24 странице сайта можно назначить специальный тип. Например, сделать ее главной страницей сайта, страницей каталога, корзины или оформления заказа.

Это нужно, чтобы Битрикс24 знал, какую страницу использовать в каждом сценарии. Например, если назначить странице тип `cart`, Битрикс24 будет использовать ее как страницу корзины сайта.

При этом страницы остаются обычными: их можно создавать, редактировать и настраивать. Меняется только их роль в работе сайта.

Методы помогают назначать странице специальный тип, получать текущие привязки и адреса специальных страниц, удалять привязки.

> Быстрый переход: [все методы](#all-methods)

## Как назначать и получать специальные страницы

1. Получите идентификатор сайта методами [landing.site.getList](../../site/landing-site-get-list.md) или [landing.site.add](../../site/landing-site-add.md)
2. Получите идентификатор страницы методами [landing.landing.getList](../methods/landing-landing-get-list.md), [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) или [landing.landing.copy](../methods/landing-landing-copy.md)
3. Назначьте страницу специальной методом [landing.syspage.set](./landing-syspage-set.md). Для этого укажите тип специальной страницы в параметре `type` и идентификатор страницы, которую нужно привязать.
4. Проверьте текущие привязки методом [landing.syspage.get](./landing-syspage-get.md) или получите URL одной специальной страницы методом [landing.syspage.getSpecialPage](./landing-syspage-get-special-page.md)
5. Если нужно снять привязки, используйте [landing.syspage.deleteForLanding](./landing-syspage-delete-for-landing.md) или [landing.syspage.deleteForSite](./landing-syspage-delete-for-site.md). Первый метод снимает все привязки для определенной страницы, второй — очищает все специальные страницы сайта.

## Коды специальных страниц

Для типа специальной страницы используют параметр `type`. Он определяет, какую роль страница будет выполнять в сайте.

#|
|| **Код `type`** | **Назначение** | **Маркер в теле страницы** ||
|| `mainpage` | Главная страница | `#system_mainpage` ||
|| `catalog` | Главная страница каталога | `#system_catalog` ||
|| `personal` | Персональный раздел | `#system_personal` ||
|| `cart` | Корзина | `#system_cart` ||
|| `order` | Оформление заказа | `#system_order` ||
|| `payment` | Страница оплаты | `#system_payment` ||
|| `compare` | Страница сравнения | `#system_compare` ||
|| `feedback` | Страница обратной связи | `#system_feedback` ||
|#

Если для кода в текущем сайте назначена страница, Битрикс24 подставит ее адрес вместо маркера. Если такой привязки нет, маркер не сработает.

Например, если странице корзины назначен тип `cart`, то в месте с маркером `#system_cart` Битрикс24 подставит адрес этой страницы. Если привязку удалить, адрес подставляться больше не будет.

## Связь с другими объектами

Специальные страницы настраивают для определенного сайта. Каждая привязка показывает, какую страницу Битрикс24 будет использовать для нужного сценария.

**Сайт.** Методы [landing.syspage.set](./landing-syspage-set.md), [landing.syspage.get](./landing-syspage-get.md), [landing.syspage.getSpecialPage](./landing-syspage-get-special-page.md) и [landing.syspage.deleteForSite](./landing-syspage-delete-for-site.md) работают в контексте сайта. Поэтому для работы всегда нужен `siteId`. Его можно получить методами [landing.site.getList](../../site/landing-site-get-list.md) или [landing.site.add](../../site/landing-site-add.md).

**Страница.** Специальной можно назначить обычную страницу сайта. Идентификатор страницы можно получить методами [landing.landing.getList](../methods/landing-landing-get-list.md), [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) или [landing.landing.copy](../methods/landing-landing-copy.md). Если страница больше не должна использоваться как специальная, все ее привязки можно снять методом [landing.syspage.deleteForLanding](./landing-syspage-delete-for-landing.md).

## Обзор методов {#all-methods}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Назначение и получение

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.set](./landing-syspage-set.md) | Назначает специальную страницу для сайта ||
|| [landing.syspage.get](./landing-syspage-get.md) | Получает список специальных страниц сайта ||
|| [landing.syspage.getSpecialPage](./landing-syspage-get-special-page.md) | Получает URL специальной страницы сайта ||
|#

### Удаление привязок

#|
|| **Метод** | **Описание** ||
|| [landing.syspage.deleteForLanding](./landing-syspage-delete-for-landing.md) | Удаляет все привязки страницы как специальной ||
|| [landing.syspage.deleteForSite](./landing-syspage-delete-for-site.md) | Удаляет все привязки специальных страниц сайта ||
|# 
