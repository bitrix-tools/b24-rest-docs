# Работа в контексте текущего пользователя

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Стандартно библиотека CRest работает под пользователем, установившим приложение. Но бывают ситуации, когда необходимо выполнить запрос к порталу Битрикс24 под пользователем, чьи токены пришли на страницу в POST. Например, когда пользователь открыл встройку вашего приложения. Для этого можно пронаследовать методы класса CRest:

```php
require_once(__DIR__ . '/crest.php');
class CRestCurrent extends CRest
{
    protected static $dataExt = [];
    protected static function getSettingData()
    {
        $return = static::expandData(file_get_contents(__DIR__ . '/settings.json'));
        if(is_array($return))
        {
            if(!empty(static::$dataExt))
            {
                $return['access_token'] = htmlspecialchars(static::$dataExt['AUTH_ID']);
                $return['domain'] = htmlspecialchars(static::$dataExt['DOMAIN']);
                $return['refresh_token'] = htmlspecialchars(static::$dataExt['REFRESH_ID']);
                $return['application_token'] = htmlspecialchars(static::$dataExt['APP_SID']);
            }
            else
            {
                $return['access_token'] = htmlspecialchars($_REQUEST['AUTH_ID']);
                $return['domain'] = htmlspecialchars($_REQUEST['DOMAIN']);
                $return['refresh_token'] = htmlspecialchars($_REQUEST['REFRESH_ID']);
                $return['application_token'] = htmlspecialchars($_REQUEST['APP_SID']);
            }
        }
        return $return;
    }
    public static function setDataExt($data)
    {
        static::$dataExt = $data;
    }
}
```

После этого вы можете подключать файл с новым классом в своем коде и использовать методы работы текущего пользователя, когда на странице есть токены.

Проверить работу можно вызвав метод:

```php
$result = CRestCurrent::call('user.current');

echo '<pre>';
    print_r($result);
echo '</pre>';
```