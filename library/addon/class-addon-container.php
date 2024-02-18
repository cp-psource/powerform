<?php

/**
 * Class Powerform_Addon_Container
 * Container, der Addons enthält
 *
 * @since 1.1
 */
class Powerform_Addon_Container implements ArrayAccess, Countable, Iterator {

    /**
     * @since 1.1
     * @var Powerform_Addon_Abstract[]
     */
    private $addons = array();

    /**
     * @since 1.1
     *
     * @param mixed $offset
     *
     * @return bool
     */
    public function offsetExists($offset): bool {
        return isset($this->addons[$offset]);
    }

    /**
     * @since 1.1
     *
     * @param mixed $offset
     *
     * @return Powerform_Addon_Abstract|null
     */
    public function offsetGet($offset): ?Powerform_Addon_Abstract {
        return $this->addons[$offset] ?? null;
    }

    /**
     * @since 1.1
     *
     * @param mixed $offset
     * @param mixed $value
     */
    public function offsetSet($offset, $value): void {
        $this->addons[$offset] = $value;
    }

    /**
     * @since 1.1
     *
     * @param mixed $offset
     */
    public function offsetUnset($offset): void {
        unset($this->addons[$offset]);
    }

    /**
     * @since 1.1
     *
     * @return int
     */
    public function count(): int {
        return count($this->addons);
    }

    /**
     * @since 1.1
     *
     * @return array
     */
    public function get_slugs(): array {
        return array_keys($this->addons);
    }

    /**
     * @since 1.1
     *
     * @return array
     */
    public function to_grouped_array(): array {
        $addons = array();

        foreach ($this->addons as $slug => $addon_members) {
            // force to offsetGet
            // in case will added hook
            $addon = $this[$slug];
            // enable later when implemented
            //  if ( ! $addon ) {
            //  continue;
            // }
            $addons[$addon->get_slug()] = $addon->to_array();
        }

        return $addons;
    }

    /**
     * @since 1.1
     *
     * @return array
     */
    public function to_array(): array {
        $addons = array();

        foreach ($this->addons as $slug => $addon_members) {
            // force to offsetGet: enable when needed
            // in case will added hook
            $addon = $this[$slug];
            // if ( ! $addon ) {
            //  continue;
            // }

            $addons[$addon->get_slug()] = $addon->to_array();
        }

        return $addons;
    }

    /**
     * @since 1.1
     *
     * @return mixed
     */
    public function current(): mixed {
        return current($this->addons);
    }

    /**
     * @since 1.1
     */
    public function next(): void {
        next($this->addons);
    }

    /**
     * @since 1.1
     *
     * @return mixed
     */
    public function key(): mixed {
        return key($this->addons);
    }

    /**
     * @since 1.1
     *
     * @return bool
     */
    public function valid(): bool {
        return key($this->addons) !== null;
    }

    /**
     * @since 1.1
     */
    public function rewind(): void {
        reset($this->addons);
    }
}
