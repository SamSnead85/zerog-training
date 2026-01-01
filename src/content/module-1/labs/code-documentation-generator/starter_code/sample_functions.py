# Sample Functions for Documentation Generator Lab
# These functions are intentionally undocumented for the exercise

def calc_price(base, qty, disc=0, tax_rate=0.08):
    if disc > 1:
        disc = disc / 100
    subtotal = base * qty * (1 - disc)
    return subtotal * (1 + tax_rate)


def merge_dicts(d1, d2, overwrite=True):
    result = d1.copy()
    for k, v in d2.items():
        if k in result and not overwrite:
            continue
        result[k] = v
    return result


def retry_operation(func, max_attempts=3, delay=1):
    import time
    for attempt in range(max_attempts):
        try:
            return func()
        except Exception as e:
            if attempt == max_attempts - 1:
                raise
            time.sleep(delay)


def parse_user_input(raw_input, validators=None, default=None):
    if not raw_input or not raw_input.strip():
        return default
    
    cleaned = raw_input.strip().lower()
    
    if validators:
        for validator in validators:
            if not validator(cleaned):
                return default
    
    return cleaned


def batch_process(items, processor, batch_size=10, on_error="skip"):
    results = []
    errors = []
    
    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        for item in batch:
            try:
                results.append(processor(item))
            except Exception as e:
                if on_error == "raise":
                    raise
                elif on_error == "skip":
                    errors.append((item, str(e)))
                    continue
    
    return {"results": results, "errors": errors}
