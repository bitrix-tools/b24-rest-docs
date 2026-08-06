# Пункт в меню пользователя USER_PROFILE_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, user`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню пользователя — то, которое открывается по аватару в правом верхнем углу. Меню доступно с любой страницы Битрикс24, поэтому точка подходит действиям, которые не привязаны к разделу: личные настройки приложения, переход в свой раздел, отправка данных о себе во внешний сервис.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `USER_PROFILE_MENU` | Пункт в меню пользователя ||
|#

### Где находится в интерфейсе

Нажмите на аватар в правом верхнем углу и выберите кнопку *Расширения*. Пункт приложения выводится в открывшемся меню, вместе со встроенными пунктами.

![Пункт в меню пользователя](./_images/USER_PROFILE_MENU.png "Пункт в меню пользователя")

Название пункта задается параметром `TITLE` при регистрации. Если параметр не передан, выводится название приложения.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => bbdb976c9f5d067b1d48d102ab17b995
    [AUTH_ID] => ae70bb6600705a0700005a4b00000001f0f107ab19f75f907d2320df1129aa61f63efc
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 9eefe26600705a0700005a4b00000001f0f1078586205803785eca5262f6ff48e025ee
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => user,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => USER_PROFILE_MENU
    [PLACEMENT_OPTIONS] => {"USER_ID":"1","URI":"\/company\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

#|
|| **Ключ** | **Описание** ||
|| **USER_ID**
[`string`](../../data-types.md) | Идентификатор текущего пользователя — того, кто открыл меню.

Значение не зависит от того, чья карточка сотрудника открыта на странице: меню принадлежит текущему пользователю. Чтобы получить идентификатор владельца открытой карточки, используйте точку [USER_PROFILE_TOOLBAR](./profile-toolbar.md) ||
|| **URI**
[`string`](../../data-types.md) | Адрес страницы, с которой открыт виджет. Меню выводится на всех страницах Битрикс24, поэтому значение каждый раз разное ||
|#

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](../placement-bind.md): переданные значения не сохраняются, [placement.get](../placement-get.md) возвращает пустой массив.

## Связь с другими объектами

**Пользователь.** По `USER_ID` из контекста вызова приложение получает данные сотрудника методом [user.get](../../user/user-get.md) — имя, должность, подразделение, часовой пояс.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "USER_PROFILE_MENU",
        "HANDLER": "https://your-domain.com/widgets/profile-menu-handler.php",
        "TITLE": "Мои настройки интеграции",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мои настройки интеграции"
          },
          "en": {
            "TITLE": "My integration settings"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'placement.bind',
        params: {
          PLACEMENT: 'USER_PROFILE_MENU',
          HANDLER: 'https://your-domain.com/widgets/profile-menu-handler.php',
          TITLE: 'Мои настройки интеграции',
          LANG_ALL: {
            ru: {
              TITLE: 'Мои настройки интеграции',
            },
            en: {
              TITLE: 'My integration settings',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
      }
    } catch (error) {
      // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключение SDK (UMD-сборка), глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function bindUserProfileMenu() {
        try {
          // Инициализация SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'USER_PROFILE_MENU',
              HANDLER: 'https://your-domain.com/widgets/profile-menu-handler.php',
              TITLE: 'Мои настройки интеграции',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мои настройки интеграции',
                },
                en: {
                  TITLE: 'My integration settings',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindUserProfileMenu)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'USER_PROFILE_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/profile-menu-handler.php',
                    'TITLE' => 'Мои настройки интеграции',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мои настройки интеграции',
                        ],
                        'en' => [
                            'TITLE' => 'My integration settings',
                        ],
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'USER_PROFILE_MENU',
            HANDLER: 'https://your-domain.com/widgets/profile-menu-handler.php',
            TITLE: 'Мои настройки интеграции',
            LANG_ALL: {
                ru: {
                    TITLE: 'Мои настройки интеграции'
                },
                en: {
                    TITLE: 'My integration settings'
                }
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'placement.bind',
        [
            'PLACEMENT' => 'USER_PROFILE_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/profile-menu-handler.php',
            'TITLE' => 'Мои настройки интеграции',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мои настройки интеграции',
                ],
                'en' => [
                    'TITLE' => 'My integration settings',
                ],
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
    res, err := client.Core().Call(ctx, "placement.bind", b24.Params{
    	"PLACEMENT": "USER_PROFILE_MENU",
    	"HANDLER":   "https://your-domain.com/widgets/profile-menu-handler.php",
    	"TITLE":     "Мои настройки интеграции",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мои настройки интеграции",
    		},
    		"en": b24.Params{
    			"TITLE": "My integration settings",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./profile-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-list.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../user/index.md)
- [{#T}](../../../settings/interactivity/index.md)
