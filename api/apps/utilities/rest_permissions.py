from functools import wraps


def allow_admin(func):
    """
    This decorator is used to check if the user profile position is admin
    """
    is_object_permission = "has_object" in func.__name__

    @wraps(func)
    def func_wrapper(*args, **kwargs):
        request = args[0]
        # use second parameter if object permission
        if is_object_permission:
            request = args[1]

        if (
            request.user
            and request.user.is_authenticated
            and request.user.profile.is_admin
        ):
            return True

        return func(*args, **kwargs)

    return func_wrapper


def allow_with_permission(permission: str):
    """
    This decorator is used to check if the user has the required permission
    """

    def decorator(func):
        is_object_permission = "has_object" in func.__name__

        @wraps(func)
        def func_wrapper(*args, **kwargs):
            request = args[0] if not is_object_permission else args[1]

            user = request.user
            if user.is_authenticated and user.has_perm(permission):
                return True

            return func(*args, **kwargs)

        return func_wrapper

    return decorator
